const fs = require('fs');
const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;

const express = require('express');

const server = express(); // server has been started

// here goes the code

// body parser
server.use(express.json());
server.use(express.static('public'));

// middleware
server.use( (req, res, next) => {
    console.log (req.method, req.ip, req.hostname, req.get('User-Agenet'));
    next();
} )

const auth = (req, res, next) => {
    if (req.query.password === '505') {
        next();
    } else {
        res.sendStatus(401);
    }
}

// server.use(auth);




server.get('/demo',  (req, res)=> {
    res.sendStatus(201).send("Hello Express !");
    // res.sendFile('index.html', { root: 'R:/MERN-Stack/ExpressJS/Ch3-ExpessJS' });
    // res.json(products);
    // res.sendStatus(200);
})

// there name: API - Endpoint- Route
server.get('/', (req, res) => {
    res.json({type:'GET'});
})
server.post('/', auth, (req, res) => {
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