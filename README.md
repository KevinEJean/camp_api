# CampusRate API

API REST de gestion de données et services lié au campus.

`camp-api` fournit un point d’entrée central pour enregistrer, consulter et exploiter les informations nécessaires. Le projet est développé avec [NestJS](https://nestjs.com/) et TypeScript.

> Le projet est en développement actif. Le contrat d’API peut évoluer avant la première version stable.

## Fonctionnalités

- vérification de l’état du service;
- gestion des locations;
- gestion d'erreures globale
- réponses HTTP au format JSON;
- architecture modulaire par domaine;
- contrôles de qualité avec ESLint et Prettier.

## Technologies

- Node.js;
- TypeScript;
- NestJS;
- Jest;
- Supertest;
- ESLint;
- Prettier.

## Prérequis

- une version de Node.js compatible avec le fichier `package.json`;
- npm;
- Git;

Vérifier l’environnement local :

```bash
node --version
npm --version
git --version
```

## Installation

Cloner le dépôt :

```bash
git clone <URL_DU_DEPOT>
cd camp-api
```

Installer les dépendances :

```bash
npm install
```

## Configuration

L’application attend la variable d’environnement suivante :

| Variable | Obligatoire | Description | Exemple local |
|---|---|---|---|
| `PORT` | Oui | Port d’écoute du serveur HTTP | `3000` |

Le numéro `3000` est seulement un exemple de configuration locale. L’application ne doit pas imposer silencieusement ce port dans son code.

Sous Linux ou macOS :

```bash
PORT=3000 npm run start:dev
```

Sous PowerShell :

```powershell
$env:PORT=3000
npm run start:dev
```

Si le projet utilise un fichier `.env`, créer celui-ci à partir du modèle versionné :

```bash
cp .env.example .env
```

Le fichier `.env` ne doit jamais être ajouté au dépôt.

## Exécution

### Développement

```bash
npm run start:dev
```

### Production

```bash
npm run build
npm run start:prod
```

Avec `PORT=3000`, l’API est accessible à l’adresse suivante :

```text
http://localhost:3000/api/v1
```

## API

Toutes les routes sont exposées sous le préfixe global `/api/v1`.

Consulter la [collection Postman](docs/Test_Postman.md) pour une liste technique de toutes les routes.

| Méthode | Route | Statut attendu | Description |
|---|---|---:|---|
| `GET` | `/api/v1/health` | `200 OK` | Vérifie l’état du service |
| `GET` | `/api/v1/locations` | `200 OK` | Retourne les locations |
| `GET` | `/api/v1/locations/{id}` | `200 OK` | Retourne une locations |
| `POST` | `/api/v1/locations` | `201 Created` | Crée une location |
| `PATCH` | `/api/v1/locations/{id}` | `200 OK` | Modifie une location |
| `DELETE` | `/api/v1/locations/{id}` | `204 No Content` | Supprime une location |
| `GET` | `/api/v1/ratings` | `200 OK` | Retourne les ratings |
| `GET` | `/api/v1/ratings/{id}` | `200 OK` | Retourne un ratings |
| `POST` | `/api/v1/ratings` | `201 Created` | Crée un ratings |
| `PATCH` | `/api/v1/ratings/{id}` | `200 OK` | Modifie un ratings |
| `DELETE` | `/api/v1/ratings/{id}` | `204 No Content` | Supprime un ratings |

### Vérifier l’état du service

```bash
curl -i http://localhost:3000/api/v1/health
```

Exemple de réponse :

```bash
CampusRate API is up and running 🚀
```

### Obtenir les locations

```bash
curl -i -X GET http://localhost:3000/api/v1/locations
```

### Créer une location

Bash
```bash
curl -i -X POST -d '{"name":"Bibliothèque principale", "description":"Espace calme avec prises.", "category":"STUDY_SPACE", "address":"Pavillon A, local A-210", "services":["WIFI", "POWER_OUTLETS", "SEATING"], "status":"ACTIVE"}' http://localhost:3000/api/v1/locations
```

PowerShell
```powershell
curl.exe -i -X POST http://localhost:3000/api/v1/locations `
  -H "Content-Type: application/json" `
  -d "{\`"name\`":\`"Bibliothèque principale\`", \`"description\`":\`"Espace calme avec prises.\`", \`"category\`":\`"STUDY_SPACE\`", \`"address\`":\`"Pavillon A, local A-210\`", \`"services\`":[\`"WIFI\`",\`"POWER_OUTLETS\`",\`"SEATING\`"], \`"status\`":\`"ACTIVE\`"}"
```

Attribut falcutatif :
- services = [ ] (valeur par défaut)
- status = "ACTIVE" (valeur par défaut) ou "TEMPORARILY_CLOSED" ou "CLOSED"

## Persistance des données

La base de données persiste après réinitialisation. Au cas où le fichier (ou le dossier) est supprimée, une nouvelle base de données sera créée pendant l'initialisation de l'application.

## Structure du projet

```text
src/
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.spec.ts
├── app.service.ts
├── main.ts
├── util/
│   └── util.ts
├── config/
│   └── db.config.ts
├── data/
│   └── databaseLocations.json
│   └── databaseRatings.json
├── health/
│   ├── health.controller.ts
│   └── health.module.ts
├── locations/
│   ├── locations.module.ts
│   ├── locations.controller.ts
│   ├── locations.service.ts
│   ├── locations.service.spec.ts
│   ├── dto/
│   │   ├── create-locations.dto.ts
│   │   ├── response-locations.dto.ts
│   │   └── update-locations.dto.ts
│   ├── entities/
│   │   └── locations.entity.ts
│   └── enums/
│       ├── category.enum.ts
│       └── status.enum.ts
├── problems/
│   ├── problems-manager.ts
│   ├── problems.dto.ts
│   ├── problems.entity.ts
│   ├── details/
│   │   ├── problems-default.ts
│   │   ├── problems-http.ts
└── ratings/
    ├── ratings.module.ts
    ├── ratings.controller.ts
    ├── ratings.service.ts
    ├── romms.service.spec.ts
    ├── dto/
    │   ├── create-ratings.dto.ts
    │   └── update-ratings.dto.ts
    └── entities/
        └── ratings.entity.ts
```

Le projet suit une organisation par fonctionnalité :

- les modules regroupent les composants d’un domaine;
- les contrôleurs gèrent les échanges HTTP;
- les services portent la logique applicative;
- les DTO définissent la forme des données échangées;

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run start` | Démarre l’application |
| `npm run start:dev` | Démarre l’application en mode surveillance |
| `npm run build` | Compile l’application |
| `npm run lint` | Analyse et corrige le code selon les règles configurées |
| `npm run test` | Exécute les tests unitaires |
| `npm run test:e2e` | Exécute les tests de bout en bout |
| `npm run test:cov` | Produit le rapport de couverture des tests |

## Sécurité

Pour signaler une vulnérabilité, utiliser le mécanisme de signalement privé du dépôt plutôt qu’une issue publique.

## Documentation

- [IAGraphie](docs/IAGraphie.pdf)
- [Postman](docs/Test_Postman.md)

## Licence

Consulter le fichier `LICENSE` à la racine du dépôt pour connaître les conditions d’utilisation et de redistribution.
