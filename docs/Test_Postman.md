# Collection Postman pour essais manuels :

*Remplacer le port et version au besoin* 

```bash
GET http://localhost:3000/api/v1/health
```

```bash
GET http://localhost:3000/api/v1/locations
```

```bash
POST http://localhost:3000/api/v1/locations
curl -i \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Bibliothèque principale", "description":"Espace calme avec prises.", "category":"STUDY_SPACE", "address":"Pavillon A, local  A-210", "services":"["WIFI", "POWER_OUTLETS", "SEATING"]", "status":"ACTIVE"}' \
  http://localhost:3000/api/v1/locations
```

```bash
PATCH http://localhost:3000/api/v1/locations
curl -i \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"id":"1"}' \
  http://localhost:3000/api/v1/locations
```

```bash
DELETE http://localhost:3000/api/v1/locations
curl -i \
  -X DELETE \
  -H "Content-Type: application/json" \
  -d '{"id":"1"}' \
  http://localhost:3000/api/v1/locations
```