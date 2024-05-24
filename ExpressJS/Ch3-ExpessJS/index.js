const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readlinkSync('data.json', 'utf-8'));
const products = data.products;