import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleList: [],
            recipesList: [],
            modal: false,
            activeItem: {
                name: "",
                expiry_date: "2021-11-17",
                score: 81,
                quantity: 0,
                unit: "U",
                tags: "Fruit",
            },
        };
    }

    componentDnameMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
            .get("/api/articles/")
            .then((res) => this.setState({ articleList: res.data }))
            .catch((err) => console.log(err));
    };

    refreshRecipes = () => {
        axios
            .get("/api/recipes/")
            .then((res) => this.setState({ recipesList: res.data }))
            .catch((err) => console.log(err));
    };

    toggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    handleSubmit = (item) => {
        this.toggle();

        console.log(item);

        axios
            .post("/api/articles/", item)
            .then((res) => { console.log(res);
            }, (err) => {
                console.log(err);
            });
    };

    handleDelete = (item) => {
        axios
            .delete(`/api/articles/${item.name}/`)
            .then((res) => this.refreshList());
    };

    createItem = () => {
        const item = { name: "", expiry_date: "2021-11-17", score: 81, quantity: 1, unit: "U", tags: "Fruit" };

        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    editItem = (item) => {
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    displayArticles = () => {
        return this.refreshList();
    };
    displayRecipes = () => {
        return this.refreshRecipes();
    };

    renderTabList = () => {
        return (
            <div className="nav nav-tabs">
                <span
                    onClick={() => this.displayArticles()}
                    className={"nav-link active"}
                >
                    Liste des articles
                </span>
                <span
                    onClick={() => this.displayRecipes()}
                    className={"nav-link active"}
                >
                    Recettes Possibles
                </span>
            </div>
        );
    };

    renderItems = () => {
            const newItems = this.state.articleList;

            return newItems.map((item) => (
                      <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span
                          className={`flago-title mr-2 ${
                                          this.state.viewCompleted ? "completed-flago" : ""
                                        }`}
                          title={item.quantity}
                        >
                          {item.quantity}
                        </span>
                        <span
                          className={`flago-title mr-2 ${
                                          this.state.viewCompleted ? "completed-flago" : ""
                                        }`}
                          title={item.quantity}
                        >
                          {item.name}
                        </span>
                        <span
                          className={`flago-title mr-2 ${
                                          this.state.viewCompleted ? "completed-flago" : ""
                                        }`}
                          title={item.quantity}
                        >
                          {item.expiry_date}
                        </span>
                        <span>
                          <button
                            className="btn btn-secondary mr-2"
                            onClick={() => this.editItem(item)}
                          >
                            Modifier l'article
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => this.handleDelete(item)}
                          >
                            Supprimer un article
                          </button>
                        </span>
                      </li>
                    ));
          };

    render() {
            return (
                      <main className="container">
                        <h1 className="text-white text-uppercase text-center my-4">Flago app</h1>
                        <div className="row">
                          <div className="col-md-6 col-sm-10 mx-auto p-0">
                            <div className="card p-3">
                              <div className="mb-4">
                                <button
                                  className="btn btn-primary"
                                  onClick={this.createItem}
                                >
                                Ajouter un produit
                                </button>
                              </div>
                              {this.renderTabList()}
                              <ul className="list-group list-group-flush border-top-0">
                                {this.renderItems()}
                              </ul>
                            </div>
                          </div>
                        </div>
                        {this.state.modal ? (
                                      <Modal
                                        activeItem={this.state.activeItem}
                                        toggle={this.toggle}
                                        onSave={this.handleSubmit}
                                      />
                                    ) : null}
                      </main>
                    );
          }

}

export default App;
