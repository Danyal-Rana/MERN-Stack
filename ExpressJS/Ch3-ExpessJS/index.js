const fs = require('fs');
const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;

const express = require('express');

const server = express(); // server has been started

// here goes the code
server.get('/demo', (req, res)=> {
    res.sendStatus(201).send("Hello Express !");
    // res.sendFile('index.html', { root: 'R:/MERN-Stack/ExpressJS/Ch3-ExpessJS' });
    // res.json(products);
    // res.sendStatus(200);
})

// there name: API - Endpoint- Route
server.get('/', (req, res) => {
    res.json({type:'GET'});
})
server.post('/', (req, res) => {
    res.json({type:'POST'});
})
server.put('/', (req, res) => {
    res.json({type:'PUT'});
})
server.delete('/', (req, res) => {
    res.json({type:'DELETE'});
})
server.patch('/', (req, res) => {
    res.json({type:'PATCH'});
})


server.listen(8080, () => { // server end
    console.log ("Server Started...");
});