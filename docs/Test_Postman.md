# Collection Postman pour essais manuels :

*Remplacer le port et la version au besoin* 

## Health

```bash
GET http://localhost:3000/api/v1/health
```

---

## Locations

```bash
GET http://localhost:3000/api/v1/locations
```

![](images/location/GET.jpeg)
---

```bash
GET http://localhost:3000/api/v1/locations/{idLocation}
```

![](images/location/GET_ONE.jpeg)
---

```bash
POST http://localhost:3000/api/v1/locations
Body :
{
  "name": "Bibliothèque Centrale",
  "description": "Espace de travail calme avec postes informatiques et salles de réunion.",
  "category": "STUDY_SPACE",
  "address": "1234, rue de l'Université, Montréal, QC",
  "services": [
    "Wi-Fi",
    "Impression",
    "Salles d'étude"
  ],
  "status": "ACTIVE"
}
```

![](images/location/POST.jpeg)
![](images/location/POST_ERR.jpeg)
![](images/location/POST2.jpeg)
---

```bash
PATCH http://localhost:3000/api/v1/locations/{idLocation}
Body :
{
  "status": "CLOSED"
}
```

![](images/location/PATCH.jpeg)
---

```bash
DELETE http://localhost:3000/api/v1/locations/{idLocation}
```

![](images/location/DELETE.jpeg)
![](images/location/DELETE_ERR.jpeg)
---

---

## Ratings

```bash
GET http://localhost:3000/api/v1/ratings
```

![](images/rating/GET.jpeg)
---

```bash
GET http://localhost:3000/api/v1/ratings/{idRating}
```

![](images/rating/GET_ONE.jpeg)
---

```bash
POST http://localhost:3000/api/v1/ratings
Body :
{
  "placeId": "{idLocation}",
  "authorName": "Polo Marko",
  "rating": 10,
  "comment": "Excellente ambiance, je suis un grand fan!"
}
```

![](images/rating/POST.jpeg)
![](images/rating/PROOF_ReviewCount.jpeg)
---

```bash
PATCH http://localhost:3000/api/v1/ratings/{idRating}
Body :
{
  "rating": 8
}
```

![](images/rating/PATCH.jpeg)
![](images/rating/PATCH_ERR.jpeg)
---

```bash
DELETE http://localhost:3000/api/v1/ratings/{idRating}
```
