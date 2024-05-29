// fetchs/shows all documents
db.inventory.find();
db.inventory.find({});

// fetchs with condition
db.inventory.find({qty:140});

db.inventory.find ( {tags: {$in: ['red']}} );
db.inventory.find ( {tags: {$in: ['red', "danyal"]}} ); // , means or

// AND
db.inventory.find ( {tags: "red", qty: {$lt: 300}});

// OR
db.inventory.find ( {$or: [ {tags: "red"} , {qty: {$gt: 200}} ] } );


db.inventory.findOne ( {$or: [ {tags: "red"} , {qty: {$gt: 200}} ] } );