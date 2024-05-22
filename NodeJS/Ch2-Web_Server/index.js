const http = require('http');
const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf-8');
// const index = fs.readFileSync('data.json', 'utf-8');

const data = {age:20};

const server = http.createServer((req, res) => {
    console.log("Server Started...");
    console.log (req.url);

    res.setHeader("dummyName", "dummyValue");
    // res.setHeader('content-type', "application/json");
    res.setHeader('content-type', 'text/html')

    // res.end("<h1>Hello Web Socket Programming !</h1>");
    // res.end(JSON.stringify(data));

    res.end(index);
});

server.listen(8080);