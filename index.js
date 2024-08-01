const express = require('express');
const Item = require('./models/item');
const dotenv = require('dotenv')
const mongoose = require('mongoose')


dotenv.config()
const app = express()
const port = 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('connected to MongoDB'))
.catch(err => console.error('could not connect to MongoDB', err))

app.get('/items', async (req,res) => {
    try{
        const items = await Item.find()
        res.json(items)
    }catch (err){
        res.status(500).send('Internal server error')

    }
});

app.get('/items/:id', async (req,res) =>{
    try {
    const item = await Item.findById((req.params.id))
    if (!item) return res.status(404).send('item not found')
        res.json(item)
      }catch(err){
        res.status(500).send('Internal Server Error')
      }
});

app.post('/items', async (req, res) => {
    const newItem = new Item({
      name: req.body.name
    });
    try{
        const savedItem = await newItem.save()
        res.status(201).json(savedItem)
    }catch(err){
        res.status(500).send('Internal Server Error')
    }
});

app.put('item/:id', async (req,res) =>{
    try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id,
        {name: req.body.name},
        {new: true}
    )
    if (!updatedItem) return res.status(404).send("item not found")
        res.json(updatedItem);
}catch(err){
    res.status(500).send('Internal Server Error')
    }
});

app.delete('/item/:id', async (req,res) => {
    try{
    const deleteItem = await Item.findByIdAndDelete(req.params.id)
    if (!deleteItem)return res.status(404).send('item not found')
        res.json(deleteItem)
    }catch(err){
        res.status(500).send('Internal Server Error')
    }
})



// app.get('/', (req,res) =>{
//     res.send('hello world')
// })

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})