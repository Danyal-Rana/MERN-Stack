// performing this operaton on mongosh

db.inventory.insertOne(
    { item:"canvas", qty:100, tags: ["cotton"], size:{h:35, w:28.5, uom:"cm"}}
)


db.inventory.insertMany (
    [
        { item:"canvas1", qty:100, tags: ["cotton"], size:{h:35, w:28.5, uom:"cm"}},
        { item:"canvas2", qty:120, tags: ["cotton"], size:{h:40, w:30.5, uom:"cm"}},
        { item:"canvas3", qty:140, tags: ["cotton"], size:{h:45, w:32.5, uom:"cm"}},
        { item:"canvas4", qty:160, tags: ["cotton"], size:{h:50, w:34.5, uom:"cm"}},
        { item:"canvas5", qty:180, tags: ["cotton"], size:{h:55, w:36.5, uom:"cm"}},
        { item:"canvas6", qty:200, tags: ["cotton"], size:{h:60, w:38.5, uom:"cm"}},
        { item:"canvas7", qty:220, tags: ["cotton"], size:{h:65, w:40.5, uom:"cm"}},
    ]
)