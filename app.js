const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const { MongoClient } = require('mongodb')
const list = require('../backend/model')
const app = express()
const asynchandler = require('express-async-handler')
 
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());


const mongodburl=
'mongodb+srv://harish1024:harish1024@cluster0.h9d5l5g.mongodb.net/todoapp?retryWrites=true&w=majority&dbName=todo';

mongoose.connect(mongodburl)
.then(()=>{
    console.log('db connected')
})
.catch((error)=>{
    console.log(error)
})

app.listen(5000,()=>{
    console.log('server started')
})

app.get('/api/todoapp/get',asynchandler(async(req,res)=>{
    const arr= await list.find({})

    res.json(arr);
}))

app.post('/api/todoapp/post', asynchandler(async(req,res) =>{
    if(!req.body.id){
        res.send('Please add some text')
    }
    const arr = await list.create({
        id : req.body.id,
        description : req.body.description
    })
    res.json(arr)
}))

app.put('/api/todoapp/put/:id',async (req,res)=>{
    if(!req.params.id){
        console.log("Id not exits")
    }
    const e = await list.findById(req.params.id)

    const upd = await list.findByIdAndUpdate(req.params.id , req.body ,{
        new: true,
    })

    res.json(upd)
})

app.delete('/api/todoapp/delete/:id',asynchandler(async(req,res)=>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    const result = await list.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json({ message: 'Document removed successfully' });
}))


