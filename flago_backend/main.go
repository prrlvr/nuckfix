package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	articles "flago-backend/articles"

	"github.com/gorilla/handlers"
)

type Error struct {
	ErrorType   string `json:"error_type"`
	Description string `json:"description"`
}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Error{ErrorType: "Root", Description: "Root links to nothing."})
	})

	http.HandleFunc("/articles", articles.Handler)

	log.Fatal(http.ListenAndServe(":8000", handlers.LoggingHandler(os.Stdout, http.DefaultServeMux)))
}
