const http = require('http');

const data = {age:20};

const server = http.createServer((req, res) => {
    console.log("Server Started...");

    res.setHeader("dummyName", "dummyValue");
    res.setHeader('content-type', "application/json");

    // res.end("<h1>Hello Web Socket Programming !</h1>");
    res.end(JSON.stringify(data));
});

server.listen(8080);