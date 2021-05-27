const express = require('express');
const { Archivo } = require('./archivo.js');
const app = express();

const PORT = 8080;
let file = new Archivo('productos.txt');
let randomItemRoute = 0;
let itemsRoute = 0;

const server = app.listen(PORT, () => {
    console.log('Runnning server on port ' + PORT);
})

app.get('/items', async (request, response) => {
    let products = await file.products();
    itemsRoute++;

    response.json(products)
});

app.get('/item-random', async (request, response) => {
    let products = await file.products();
    let randomProducts = products.sort((a, b) => 0.5 - Math.random());
    randomItemRoute++;

    response.json({ item: randomProducts[0] })
});

app.get('/visitas', (request, response) => {
    response.json({
        visitas: {
            items: itemsRoute,
            item: randomItemRoute
        }
    })
})