package articles

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/jmoiron/sqlx"
	_ "github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

type Article struct {
	Name       string `json:"name" db:"name"`
	Tags       string `json:"tags" db:"tags"`
	ExpiryDate string `json:"expiry_date" db:"expiry_date"`
	Unit       string `json:"unit" db:"unit"`
	Score      int    `json:"score" db:"score"`
	Quantity   int    `json:"quantity" db:"quantity"`
}

func createDb() {
	if _, err := os.Stat("db.sqlite3"); err == nil {
		return
	} else {
		log.Println("Creating db.sqlite3 database...")
		file, err := os.Create("db.sqlite3")
		if err != nil {
			log.Fatal(err)
		}
		file.Close()
		log.Println("db.sqlite3 created.")
	}
}

func createArticles() {
	createDb()
	db, _ := sqlx.Open("sqlite3", "db.sqlite3")
	defer db.Close()

	_, table_check := db.Query("SELECT * FROM articles")
	if table_check == nil {
		return
	}

	createArticlesTable := `CREATE TABLE articles (
		"score" INTEGER,
		"quantity" INTEGER,
		"name" TEXT,
		"tags" TEXT,
		"expiry_date" TEXT,
		"unit" TEXT
	);`

	log.Println("Creating articles table...")
	statement, err := db.Prepare(createArticlesTable)
	if err != nil {
		log.Fatal(err.Error())
	}
	statement.Exec()
	log.Println("articles table created.")
}

func getArticles() *sqlx.Rows {
	db, _ := sqlx.Open("sqlite3", "db.sqlite3")
	defer db.Close()
	row, err := db.Queryx("SELECT * FROM articles")
	if err != nil {
		log.Fatal(err)
	}
	return row
}

func insertArticles(article Article) {
	db, _ := sqlx.Open("sqlite3", "db.sqlite3")
	defer db.Close()
	insertArticleSQL := `INSERT INTO articles(name, tags, expiry_date, quantity, unit, score) VALUES (?, ?, ?, ?, ?, ?)`
	statement, err := db.Prepare(insertArticleSQL)

	if err != nil {
		log.Fatalln(err.Error())
	}
	_, err = statement.Exec(article.Name, article.Tags, article.ExpiryDate, article.Quantity, article.Unit, article.Score)
	if err != nil {
		log.Fatalln(err.Error())
	}
}

func Handler(w http.ResponseWriter, r *http.Request) {
	createArticles()

	switch r.Method {
	case http.MethodGet:
		row := getArticles()
		defer row.Close()
		data := []Article{}
		for row.Next() {
			var article Article
			err := row.StructScan(&article)
			if err != nil {
				log.Fatal(err)
			}
			data = append(data, article)
		}
		keys, ok := r.URL.Query()["name"]
		if ok {
			fmt.Fprintf(w, "name = %s\n", keys[0])
		} else {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(data)
		}
	case http.MethodPost:
		var article Article
		err := json.NewDecoder(r.Body).Decode(&article)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		insertArticles(article)
	case http.MethodPatch:
		http.Error(w, "TODO", http.StatusMethodNotAllowed)
	case http.MethodDelete:
		http.Error(w, "TODO", http.StatusMethodNotAllowed)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}
