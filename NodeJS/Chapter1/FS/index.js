import fs from 'fs'

const txt = fs.readFileSync('demo.txt');
console.log (txt.toString());

const txt2 = fs.readFileSync('demo.txt', 'utf-8');
console.log (txt2);

// if we use readFile instead of readFileSync, then response will come in call back, if there are more code below readFile, those code will be executed, while the server will read/process the file
fs.readFile('demo.txt', 'utf-8', (err, x)=> {
    console.log (x);
})

console.log (2+3); // this will be printed before readFile

console.log ("Danyal"); // adding 'nodemon start' in script of package.json will keep giving outputs on every change in index.js