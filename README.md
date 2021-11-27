# nuckfix

## Endpoints

Classe Article
    - UUID
    - Nom
    - Date de Peremption
    - NutriScore
    - Tags (Légume, Condiment etc.)

GET/API/articles

    Liste les articles

POST/API Article

    Ajoute

UPDATE/API/article

    Modifie

DELETE/API/article

    Supprime


Classe Recette
    - UUID
    - Nom
    - Liste tuples d'articles
    - NutriScore

GET/API/recette [nb=3] // TODO filters

    Liste de recettes

// TODO ajouter recettes potentiellement
