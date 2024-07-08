const http = require('http');
const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf-8');
const data = fs.readFileSync('data.json', 'utf-8');

// const data = {age:20};

const server = http.createServer((req, res) => {
    console.log("Server Started...");
    console.log (req.url);

    switch(req.url) {
        case '/':
            res.setHeader('content-type', 'text/html');
            res.end(index);
            break;
        case '/api':
            res.setHeader('content-type', "application/json");
            res.end(data);
            break;
        default:
            res.writeHead(404);
            res.end();
    }

    // res.setHeader("dummyName", "dummyValue");
    

    // res.end("<h1>Hello Web Socket Programming !</h1>");
    // res.end(JSON.stringify(data));

    
});

server.listen(8080);