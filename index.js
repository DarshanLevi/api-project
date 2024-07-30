const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory data storage
let items = [
    {
      id: 1,
      name: "oneplus nord 1"
    },
    {
      id: 2,
      name: "samsung galaxy s24"
    }
  ];

app.get('/items', (req,res) => {
    res.json(items)
})

app.get('/items/:id', (req,res) =>{
    const item = items.find(i => i.id === parseInt(req.params.id))
    if (!item) return res.status(404).send('item not found')
        res.json(item)
})

app.post('/items', (req,res)=>{
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem)
    res.status(201).json(newItem)
})

app.put('item/:id', (req,res) =>{
    const item = items.find(i => i.id === parseInt(req.params.id))
    if (!item) return res.status(404).send("item not found")

        item.name = req.body.name;
        res.json(item)
})

app.delete('/item/:id', (req,res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id))
    if (itemIndex === -1) return res.status(404).send('item not found')

        const deletedItem = items.splice(itemIndex, 1)
        res.json(deletedItem)
})



app.get('/', (req,res) =>{
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})