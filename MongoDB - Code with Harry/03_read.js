// fetchs/shows all documents
db.inventory.find();
db.inventory.find({});

// fetchs with condition
db.inventory.find({qty:140});