# CampusRate API - v1.1.2

API REST de gestion de données et de services liée au campus.

`camp-api` fournit un point d’entrée central pour enregistrer, consulter et exploiter les informations nécessaires. Le projet est développé avec [NestJS](https://nestjs.com/) et TypeScript.

## Fonctionnalités

- vérification de l’état du service;
- gestion des emplacements et ces appréciations;
- gestion d'erreurs globale;
- persistance de données;
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
- Prettier;
- MongoDB;
- [Permit.io](https://www.permit.io/rbac).

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
npm ls # vérifier l'installation des dépendances
```

## Configuration

L’application attend la variable d’environnement suivante dans le fichier `.env.<NODE_ENV>`.

| Variable | Obligatoire | Description | Exemple local |
|---|---|---|---|
| `JWT_SECRET` | Oui | Authentification avec JWT | `"<hash>"` |
| `MONGO_URI` | Oui | Cluster d'une base de données MongoDB | `"mongodb+srv://<username>:<password>@<cluster>/?<dbName>"` |
| `NODE_ENV` | Oui | Fichier `.env` à utiliser | `"development"` |
| `PERMIT_IO_TOKEN` | Oui | Autorisation avec RBAC | `"permit_key_<hash>"` |
| `PORT` | Oui | Port d’écoute du serveur HTTP | `3000` |

#### Obtenir une clée pour `JWT_SECRET` :

```bash
node -e "console.log(require('crypto').randomBytes64 ? '' : require('crypto').randomBytes(64).toString('hex'))"
```
ou
```bash
openssl rand -hex 64
```

#### Obtenir les crédentiels pour `MONGO_URI` :

1. Créer un compte (ou se connecter) sur [MongoDB Atlas](https://cloud.mongodb.com).
2. Créer un projet, puis un cluster (l'offre gratuite **M0** suffit).
3. Dans **Database Access**, cliquer sur **Add New Database User** :
   - choisir l'authentification par mot de passe ;
   - saisir un nom d'utilisateur et un mot de passe (ou utiliser **Autogenerate Secure Password**) ;
   - donner le rôle **Read and write to any database** ;
   - NOTER LE MOT DE PASSE, il ne sera plus affiché ensuite.
4. Dans **Network Access**, cliquer sur **Add IP Address** et ajouter votre adresse IP actuelle (**Add Current IP Address**).
5. Dans **Database**, cliquer sur **Connect** sur votre cluster, puis **Drivers**, et copier la chaîne de connexion.
6. Coller cette chaîne de connexion dans la variable `MONGO_URI` du fichier `.env` de votre choix.

ou me contacter et indiquer l'addresse IP privée de votre machine:
```text
2233405@cegepmv.ca
```

#### Obtenir une clée pour `PERMIT_IO_TOKEN` :

Suivre le guide complet de `Permit.io`: https://www.permit.io/blog/how-to-protect-a-url-inside-a-nestjs-app-using-rbac-authorization

ou me contacter:
```text
2233405@cegepmv.ca
```

#### Créer un fichier `.env` :

```bash
cp .env.example .env.development
# remplacer les informations entourées de '<...>' et changer les autres variables au besoin
```

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

Avec `PORT=3000` (port par défaut), l’API est accessible à l’adresse suivante :

```text
http://localhost:3000/api/v1
```

## API

Toutes les routes sont exposées sous le préfixe global `/api/v1`.

Consulter la [collection Postman](docs/Test_Postman.md) pour une liste technique de toutes les routes.

### Health

| Méthode | Route | Statut attendu | Description |
|---|---|---:|---|
| `GET` | `/api/v1/health` | `200 OK` | Vérifie l’état du service |

### Authentification

| Méthode | Route | Statut attendu | Description |
|---|---|---:|---|
| `POST` | `/api/v1/login` | `201 Created` | S'authentifier pour accéder au service |
| `POST` | `/api/v1/signin` | `201 Created` | Créer un utilisateur pour s'authentifier |

### Emplacements

| Méthode | Route | Statut attendu | Description |
|---|---|---:|---|
| `GET` | `/api/v1/locations` | `200 OK` | Retourne les emplacements |
| `GET` | `/api/v1/locations/{id}` | `200 OK` | Retourne un emplacement |
| `POST` | `/api/v1/locations` | `201 Created` | Crée un emplacement |
| `PATCH` | `/api/v1/locations/{id}` | `200 OK` | Modifie un emplacement |
| `DELETE` | `/api/v1/locations/{id}` | `204 No Content` | Supprime un emplacement |

### Ratings

| Méthode | Route | Statut attendu | Description |
|---|---|---:|---|
| `GET` | `/api/v1/ratings` | `200 OK` | Retourne les appréciations |
| `GET` | `/api/v1/ratings/{id}` | `200 OK` | Retourne une appréciation |
| `POST` | `/api/v1/ratings` | `201 Created` | Crée une appréciation |
| `PATCH` | `/api/v1/ratings/{id}` | `200 OK` | Modifie une appréciation |
| `DELETE` | `/api/v1/ratings/{id}` | `204 No Content` | Supprime une appréciation |

### Vérifier l’état du service

```bash
curl -i -X GET http://localhost:3000/api/v1/health
```

Réponse attendue :

```bash
CampusRate API is up and running 🚀
```

### Obtenir les emplacements

```bash
curl -i -X GET http://localhost:3000/api/v1/locations
```

### Créer un emplacement

#### macOS, Linux, WSL
```bash
curl -i -X POST http://localhost:3000/api/v1/locations \
  -H "Content-Type: application/json; charset=utf-8" \
  --data-binary @- <<'EOF'
{
  "name": "Bibliothèque Centrale",
  "description": "Espace de travail calme avec postes informatiques et salles de réunion.",
  "category": "STUDY_SPACE",
  "address": "1234, rue de l'Université, Montréal, QC",
  "services": ["Wi-Fi", "Impression", "Salles d'étude"],
  "status": "ACTIVE"
}
EOF
```

#### PowerShell
```powershell
$body = @'
{
  "name": "Bibliothèque Centrale",
  "description": "Espace de travail calme avec postes informatiques et salles de réunion.",
  "category": "STUDY_SPACE",
  "address": "1234, rue de l'Université, Montréal, QC",
  "services": ["Wi-Fi", "Impression", "Salles d'étude"],
  "status": "ACTIVE"
}
'@

Invoke-WebRequest -Method Post `
  -Uri "http://localhost:3000/api/v1/locations" `
  -ContentType "application/json; charset=utf-8" `
  -Body ([System.Text.Encoding]::UTF8.GetBytes($body))
```

#### CMD

1. Sauvegarder le JSON ci-dessous comme `location.json` (encodé avec **UTF-8**):

```json
{
  "name": "Bibliothèque Centrale",
  "description": "Espace de travail calme avec postes informatiques et salles de réunion.",
  "category": "STUDY_SPACE",
  "address": "1234, rue de l'Université, Montréal, QC",
  "services": ["Wi-Fi", "Impression", "Salles d'étude"],
  "status": "ACTIVE"
}
```

2. Exécuter la requête:

```bat
curl -i -X POST http://localhost:3000/api/v1/locations ^
  -H "Content-Type: application/json; charset=utf-8" ^
  --data-binary @location.json
```

Attribut facultatif :
- services = [ ] (valeur par défaut)
- status = "ACTIVE" (valeur par défaut) ou "TEMPORARILY_CLOSED" ou "CLOSED"

## Persistance des données

Les données sont stockées dans un cluster MongoDB (Atlas), à cause de ses caractéristiques suivantes:

- **Format JSON natif** : les emplacements et appréciations sont des documents JSON, ce qui s'intègre directement avec NestJS et TypeScript;
- **Schéma flexible** : de nouveaux champs peuvent être ajoutés sans migration pendant le développement actif;
- **Persistance** : les données survivent aux redémarrages et aux redéploiements;
- **Aucune installation locale** : seule la variable `MONGO_URI` est nécessaire.

## Fonctionnalités optionnelles implémentées

### Ajouter du *rate limiting* (H1) <!-- +4 -->

> À implémenter dans le futur
<!-- 

- Pull Request: <lien> 
- Commit: <lien> 

-->
---

### Utiliser une *allowList* explicite de filtres (P1) <!-- +2 -->

Uniquement les requêtes ayant l'IP privée de la machine sur laquelle roule `CampusRate` peuvent effectuer des requêtes vers celui-ci. Toute autre source sera rejetée comme ceci:
```json
{
  "type": "locations",
  "title": "Internal Server Error",
  "status": 500,
  "detail": "An unexpected error occurred",
  "instance": "/api/v1/locations"
}
```

- Pull Request: https://github.com/KevinEJean/camp_api/pull/37
- Commit: https://github.com/KevinEJean/camp_api/pull/37/changes/55359bbf42c00cd67266c78e516b34449473baa3

---

### Sélection explicite des propriétés modifiables (P2) <!-- +2 -->

Les constantes `_id` et `placeId` ne sont pas modifables parce que:

- modifier une constante risque de briser l'indexation de mongoDB et est généralement une mauvaise pratiques;
- ils sont auto-générés par le serveur, donc pas besoin de les modifier (API CampusRate).

#### Données modifiables des emplacements

| Variables | Modifiable | Raisonement |
|---|---|---|
| name | Oui | Il est possible qu'elle soit mal écrite lors de sa creation. |
| description | Oui | Donner la chance d'ajouter / retirer des détails sur l'emplacements. |
| category | Non | Un emplacement ne change jamais de categorie / fonctionnalité. |
| address | Oui | Il est moins probable qu'une addresse change, cependant il est possible qu'elle soit mal écrite lors de sa creation. |
| services | Oui | Il ce peut qu'il ajoutes des services après une construction. |
| status | Oui | Il est très probable qu'il devient fermé en raison de construction. |

#### Données modifiables des appréciations

| Variables | Modifiable | Raisonement |
|---|---|---|
| authorName | Non | Afin de faciliter la modération et limiter les privilèges clients. |
| rating | Oui | Donner la chance d'ajuster le score. |
| comment | Oui | Il ce peut qu'une revue soit erroné ou l'autheur desir d'ajuster son commentaire. |

- Pull Request: https://github.com/KevinEJean/camp_api/pull/62
- Commit: https://github.com/KevinEJean/camp_api/pull/62/changes/03d1de2fd0e4e15daeec5830c2115c62268452cc

---

### Journalisation des opérations (L1) <!-- +3 -->

Exemple de log (dans le `terminal`):
```bash
[Nest] 25688  - 10/12/2026, 7:04:54 PM     LOG [RequestLoggerMiddleware] GET /api/v1/locations
[Nest] 25688  - 10/12/2026, 7:04:54 PM     LOG [ExecutionTimeInterceptor] GET /api/v1/locations - 75 ms
```

Dans le fichier `log/allRequests.log`:
```json
{"level": "info", "message": "GET /api/v1/locations", "timestamp": "2026-10-12T23:04:54.795Z"}
```

- Pull Request: https://github.com/KevinEJean/camp_api/pull/35
- Commit: https://github.com/KevinEJean/camp_api/pull/35/changes#diff-4fab5baaca5c14d2de62d8d2fceef376ddddcc8e9509d86cfa5643f51b89ce3d

---

### Journalisation des erreurs (L2) <!-- +3 -->

Exemple de log (dans le `terminal`):
```json
{
  "level": "warn",
  "message": "Cannot GET /api/v1/locationss",
  "method": "GET",
  "path": "/v1/locationss",
  "possibleSolution": "The requested resource was not found. Verify the ID, URL or Method is correct and that the resource has not been deleted.",
  "statusCode": 404,
  "timestamp": "2026-10-12T23:12:14.660Z"
}
```

- Pull Request: https://github.com/KevinEJean/camp_api/pull/57
- Commit: https://github.com/KevinEJean/camp_api/pull/57/changes/e3b836c8921193b16d041a751ca351e035e13ed2

---

### Authentification avec JWT (A1) <!-- +5 -->

#### Sécurité `Bearer` (authentification JWT)

L'API protège ses routes avec un jeton **JWT** envoyé dans l'en-tête `Authorization` selon le schéma `Bearer`. Par défaut, **toutes les routes exigent un jeton valide**, sauf celles marquées `@Public()` (actuellement `POST api/v1/auth/signin`, `POST api/v1/auth/login` et `GET api/v1/health`). Cette fonctionnalité est combinée avec l'*`Autorisation RBAC (A2)`*. D'abord, le serveur vérifie que la requête contient un jeton valide (signature correcte et jeton non expiré), puis il vérifie que l'utilisateur a la permission d'effectuer l'action demandée.

#### Test

1. Créer un utilisateur `(POST /api/v1/signin)`;
2. S'authentifier `(POST /api/v1/login)`;
  - un `token` sera retourné en réponse, inserer celui-ci dans **Authorization** (îcone vert): 
  ```
    Authorization: Bearer <access_token>
  ```
3. Exécuter des requêtes et tester les règles d'autorisation de `RBAC`.

- Pull Request: https://github.com/KevinEJean/camp_api/pull/65
- Commit: https://github.com/KevinEJean/camp_api/pull/65/changes/aaed0a1b8ab0d88bc726a72ebf50781e083703b7

---

### Autorisation RBAC (A2) <!-- +5 -->

Pas besoin d'autorisation pour lire toutes les emplacements et appréciations `(GET api/v1/locations && api/v1/ratings)`.

| Action | Autorisation `ADMIN` | Autorisation `USER` |
|---|---|---|
| Lire un emplacement par id | Oui | Oui |
| Créer un emplacement | Oui | Non |
| Modifier un emplacement | Oui | Non |
| Supprimer un emplacement | Oui | Non |
| Lire une appréciation par id | Oui | Oui |
| Créer une appréciation | Oui | Oui |
| Modifier une appréciation | Oui | Non |
| Supprimer une appréciation | Oui | Non |
| Lire un utilisateur par id | Oui | Non |
| Créer un utilisateur | Oui | Non |
| Modifier un utilisateur | Oui | Non |
| Supprimer un utilisateur | Oui | Non |

- Pull Request: https://github.com/KevinEJean/camp_api/pull/63
- Commit: https://github.com/KevinEJean/camp_api/pull/63/changes/e4d2c7d1ad0cbb07b7336fc520c9ba3054967995

---

### Expliquer correctement le rôle de HTTPS dans le README (T1) <!-- +1 -->

> À implémenter dans le futur
<!-- 

- Pull Request: <lien> 
- Commit: <lien> 

-->
---

### Faire fonctionner `CampusRate` localement en HTTPS (T2) <!-- +5 -->

> À implémenter dans le futur
<!-- 

- Pull Request: <lien> 
- Commit: <lien> 

-->
---

### Générer et utiliser un certificat local autosigné (T3) <!-- +2 -->

> À implémenter dans le futur
<!-- 

- Pull Request: <lien> 
- Commit: <lien> 

-->
---

### Mettre en place une redirection HTTP -> HTTPS (T4) <!-- +2 -->

> À implémenter dans le futur
<!-- 

- Pull Request: <lien> 
- Commit: <lien> 

-->
---

## Structure du projet

```text
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── configs/
│   ├── configure-swagger.ts
│   ├── configure-winston.ts
│   └── database.config.ts
├── exceptions/
│   ├── exceptions.dto.ts
│   ├── filters/
│   │   ├── http-exception.filter.ts
│   │   └── internal-exception.filter.ts
│   ├── interceptors/
│   │   └── execution-time.interceptor.ts
│   ├── middleware/
│   │   └── request-logger.middleware.ts
│   └── solutions/
│       ├── solutions-logger.ts
│       └── solutions-payload.ts
├── health/
│   ├── health.controller.ts
│   └── health.module.ts
├── locations/
│   ├── locations.controller.ts
│   ├── locations.module.ts
│   ├── locations.repository.ts
│   ├── locations.service.ts
│   ├── dto/
│   │   ├── create-locations.dto.ts
│   │   ├── response-locations.dto.ts
│   │   └── update-locations.dto.ts
│   ├── entities/
│   │   └── locations.entity.ts
│   ├── enums/
│   │   ├── category.enum.ts
│   │   └── status.enum.ts
│   └── schemas/
│       └── locations.schema.ts
├── ratings/
│   ├── ratings.controller.ts
│   ├── ratings.module.ts
│   ├── ratings.repository.ts
│   ├── ratings.service.ts
│   ├── dto/
│   │   ├── create-ratings.dto.ts
│   │   ├── response-ratings.dto.ts
│   │   └── update-ratings.dto.ts
│   ├── entities/
│   │   └── ratings.entity.ts
│   └── schemas/
│       └── ratings.schema.ts
└── utils/
    └── utils.ts
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
- [Roadmap](https://github.com/users/KevinEJean/projects/2)

## License

Consulter le fichier [LICENSE](LICENSE) à la racine du dépôt pour connaître les conditions d’utilisation et de redistribution.
