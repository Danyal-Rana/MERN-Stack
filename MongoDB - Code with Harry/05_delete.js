// deleteOne and deleteMany returns the boolean value of the operation

// will delete the whole data/documents of inventory collection
db.inventory.deleteMany ({});

// will delete the first document of collection on the base of condition
db.inventory.deleteOne ({qty: {$lt: 1000}});

// same as deleteMany but it returns the Object that contains the status of the operation
db.inventory.remove()