db.inventory.updateOne (
    {item: "canvas101"},
    {
        $set: {qty: 5},
        $currentDate: {lastModified: true}
    }
)


db.inventory.updateMany (
    {qty: {$lt: 300}},
    {
        $set: {uom: "inch"},
        $currentDate: {lastModified: true}
    }
)