# Prueba de Trabajo | NodeJS

REST API para una prueba de trabajo creado por José Bolívar.

Tecnologias: NodeJS, ExpressJS

Base de datos: MongoDB

## Install

`npm install`

## Run the app

`npm start --> running on port 3001 by default`

## Run test

`npm test`

# REST API

## Insertar datos de bicicletas en la base de datos

Solo se usa en caso de que desee cambiar la ruta de la base de datos a local u otra nube.

Nota: Antes de usar la base de datos, debe crear un índice de tipo GeoJSON, es necesario para medir la distancia de las coordenadas. Ejemplo:
`db.bikes.createIndex( { point : "2dsphere" } )`

### Request

`GET /insert-bikes`

    curl -i -H 'Accept: application/json' http://localhost:3001/insert-bikes/

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    {success: true}

## Buscar bicicletas cercanas a una coordenada

### Request

`GET /stations`

### Query params

`longitude --> Longitud`
`latitude--> Latitud`
`distance--> Distancia en metros`

    curl -i -H 'Accept: application/json' http://localhost:3001/stations?longitude=-103.35305898513403&latitude=20.671032088262155&distance=500

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    {success: true, bikes: [...]}
