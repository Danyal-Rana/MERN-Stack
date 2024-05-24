const fs = require('fs');
const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;

const express = require('express');

const server = express(); // server has been started

// here goes the code
server.get('/', (req, res)=> {
    res.send("Hello Express !");
})


server.listen(8080, () => { // server end
    console.log ("Server Started...");
});