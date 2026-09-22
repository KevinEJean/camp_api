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
curl -i \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Bibliothèque principale", "description":"Espace calme avec prises.", "category":"STUDY_SPACE", "address":"Pavillon A, local  A-210", "services":"["WIFI", "POWER_OUTLETS", "SEATING"]", "status":"ACTIVE"}' \
  http://localhost:3000/api/v1/locations
```

```bash
PATCH http://localhost:3000/api/v1/locations/{id}
curl -i \
  -X PATCH \
  -H "Content-Type: application/json" \
  -d '{"status":"CLOSED"}' \
  http://localhost:3000/api/v1/locations/{id}
```

```bash
DELETE http://localhost:3000/api/v1/locations/{id}
curl -i \
  -X DELETE \
  -H "Content-Type: application/json" \
  -d '{"id":"plc_00ABC123"}' \
  http://localhost:3000/api/v1/locations/{id}
```

## Ratings
