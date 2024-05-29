// will get only first document, displaying products/blogs per page
db.inventory.find().limit(10);

// will skip the first two document, used in pagination/blogging
db.inventory.find().skip(2);

// will sort the documents Ascendingly according to the condition
db.inventory.find().sort({qty: 1});

// will sort the documents in Descending order according to the condition
db.inventory.find().sort({qty: -1});