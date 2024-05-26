# Projet Fullstack Groupe 11

## Description

Ce projet est un réseau social développé en utilisant GraphQL, TypeScript, Apollo Server, Codegen et React. Il permet aux utilisateurs de créer des comptes, de publier des articles, d'ajouter des commentaires et de liker ou unliker des articles.

## Prérequis

- Node.js (version 14.x ou plus récente)
- npm (version 6.x ou plus récente)

## Installation et démarrage du projet

Suivez les étapes ci-dessous pour cloner le projet, installer les dépendances et démarrer les serveurs backend et frontend.

### Étapes

1. Clonez le dépôt GitHub du projet.
    ```bash
    git clone https://github.com/Pathi14/Projet_fullstack_Groupe11.git
    ```

2. Accédez au répertoire du projet.
    ```bash
    cd Projet_fullstack_Groupe11
    ```

3. Installez les dépendances pour le backend.
    ```bash
    cd backend
    npm install
    ```

4. Revenez à la racine du projet.
    ```bash
    cd ..
    ```

5. Installez les dépendances pour le client.
    ```bash
    cd client
    npm install
    ```

6. Revenez à la racine du projet.
    ```bash
    cd ..
    ```

7. Démarrez le projet.

    D'abord le backend
    ```bash
    cd Backend
    npm run start
    ```
    Puis le frontend
    ```bash
    cd frontend_
    npm run start
    ```

## Utilisation

### Backend

Le serveur backend est accessible à l'adresse suivante :

http://localhost:4000


### Frontend

Le client frontend est accessible à l'adresse suivante :

http://localhost:3000


## Fonctionnalités

- **Authentification des utilisateurs**: Inscription et connexion des utilisateurs.
- **Création de posts**: Les utilisateurs peuvent créer des articles.
- **Commentaires**: Les utilisateurs peuvent commenter les articles.
- **Likes**: Les utilisateurs peuvent liker et unliker les articles.

## Structure du projet

- **backend**: Contient le code source du serveur GraphQL.
- **client**: Contient le code source de l'application React.

## Dépendances principales

### Backend

- `apollo-server-express`: Pour créer le serveur GraphQL.
- `graphql`: Pour la gestion des types et schémas GraphQL.
- `prisma`: Pour la gestion de la base de données.
- `jsonwebtoken`: Pour la gestion des tokens JWT.

### Client

- `react`: Pour la création de l'interface utilisateur.
- `apollo-client`: Pour interagir avec le serveur GraphQL.
- `graphql`: Pour la gestion des requêtes et mutations GraphQL.

## Contribution

Les contributions sont les bienvenues. Pour toute demande de fonctionnalité ou rapport de bug, veuillez ouvrir une issue sur le dépôt GitHub.

## Auteurs

- **Groupe 11** - Développeurs du projet

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---