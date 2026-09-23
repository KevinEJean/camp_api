# Collection Postman pour essais manuels :

*Remplacer le port et la version au besoin* 

## Health

```bash
GET http://localhost:3000/api/v1/health
```

## Locations

```bash
GET http://localhost:3000/api/v1/locations
```

```bash
GET http://localhost:3000/api/v1/locations/{id}
```

```bash
POST http://localhost:3000/api/v1/locations
body : '{"name":"Bibliothèque principale", "description":"Espace calme avec prises.", "category":"STUDY_SPACE", "address":"Pavillon A, local  A-210", "services":"["WIFI", "POWER_OUTLETS", "SEATING"]", "status":"ACTIVE"}'
```

```bash
PATCH http://localhost:3000/api/v1/locations/{id}
body : '{"status":"CLOSED"}'
```

```bash
DELETE http://localhost:3000/api/v1/locations/{id}
body : '{"id":"plc_01ABC123"}'
```

## Ratings

```bash
GET http://localhost:3000/api/v1/ratings
```

```bash
GET http://localhost:3000/api/v1/ratings/{id}
```

```bash
POST http://localhost:3000/api/v1/ratings
body : '{"placeId":"plc_01ABC123", "authorName":"Anonymous", "rating":10, "comment":"Emplacement parfait!"}'
```

```bash
PATCH http://localhost:3000/api/v1/ratings/{id}
body : '{"rating":2, "comment":"Emplacement terrible..."}'
```

```bash
DELETE http://localhost:3000/api/v1/ratings/{id}
```