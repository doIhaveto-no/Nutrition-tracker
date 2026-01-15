# API

Sve vrste navedene (boldovane) su definisane u `/backend/types.ts` ili detaljnije u `/backend/schemas.ts`

U URL-u `HOST` bi trebalo da bude localhost, a `PORT` 5173

Path parametri se nalaze u pathu URL-a i pišu se kao /:param/  
Dve tačke NE TREBAJU da se dodaju, samo služe u dokumentaciji da označe path parametar;
Ceo deo ':param' treba zameniti vrednošću

Query parametri se nalaze posle znaka pitanja u URL-u u formatu param=value  
Query parametri su odvojeni ampersandima ("&")  
Samo 'value' treba zameniti vrednošću

## Ingredients API

### Get all ingredients

`GET http://HOST:PORT/api/ingredients?limit=20?page=1`

Query parametri:

- limit: integer - koliko elemenata da vrati (opcionalan, default 20)
- page: integer - koju "stranicu" da vrati (n-tih limit ingredienta) (opcionalan, default 1);

Vraća:

- Uspešno izvršavanje: status 200, body **Ingredients**
- Limit/Page nije integer: status 400, body **Error**
- Greška pri izvršavanju: status 500, body **Error**

### Dodaj **Ingredient**

`POST http://HOST:PORT/api/ingredients`

Dodaje **Ingredient** ili **Ingredients** u databasu i vraća dodato

Request body: **Ingredient** ili **Ingredients**

Vraća:

- Uspešno izvršavanje: status 201, body **Ingredient**/**Ingredients** koji je/su dodati
- Greška u request body-ju: status 400, body **Error**
- Greška pri izvršavanju: status 500, body **Error**

### Get po ID-u

`GET http://HOST:PORT/api/ingredients/:id/`

Path parametri:

- id: integer - id koji se traži

Vraća:

- Uspešno izvršavanje: status 200, body **Ingredient** sa traženim Id-om
- ID nije integer: status 400, body **Error**
- ID ne postoji: status 404, body **Error**
- Greška pri izvršavanju: status 500, body **Error**

### Zameni **Ingredient** po ID-u

`PUT http://HOST:PORT/api/ingredients/:id/`

Zamenjuje **Ingredient** sa id-om i vraća novi i stari

Request body: **Ingredient**

Path parametri:

- id: integer - id koji se traži

Vraća:

- Uspešno izvršavanje: status 201, body **Ingredients** gde je prvi element stari a drugi novi **Ingredient**
- Greška u request body-ju: status 400, body **Error**
- Greška pri izvršavanju: status 500, body **Error**

### Obriši **Ingredient** po ID-u

`DELETE http://HOST:PORT/api/ingredients/:id/`

Briše **Ingredient** sa id-om i vraća ga

Path parametri:

- id: integer - id koji se traži

Vraća:

- Uspešno izvršavanje: status 201, body **Ingredient** koji je izbrisan
- Greška u request body-ju: status 400, body **Error**
- Greška pri izvršavanju: status 500, body **Error**

### Pretraga **Ingredient**-a

`GET http://HOST:PORT/api/ingredients/search`

Query parametri:

- limit: integer - koliko elemenata da vrati (opcionalan, default 20)
- page: integer - koju "stranicu" da vrati (n-tih limit ingredienta) (opcionalan, default 1);
- query: string - upit/tekst koji se traži
- lang: string - u kom jeziku se traži (opcionalan, default sr, moguće vrednosti sr i en)
- type: string - vrsta ingredient-a koja se traži (opcionalan, moguće vrednosti fruit, vegetable i animal_product)

### Hrane koje sadrže **Ingredient**

`GET http://HOST:PORT/api/ingredients/:id/foods?limit=20&page=1`

Path parametri:

- id: integer - id koji se traži

Query parametri:

- limit: integer - koliko elemenata da vrati (opcionalan, default 20)
- page: integer - koju "stranicu" da vrati (n-tih limit ingredienta) (opcionalan, default 1);

## Foods API

Isti kao Ingredients API, osim što tamo gde je **Ingredient** je **Food** i obrnuto
