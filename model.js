const mongoose = require('mongoose')

const todolist = mongoose.Schema({
   id:{
    type: String,
    required: [true,'Please add a text value']
   },
   description:{
    type: String,
    required: [true,'Please add a text value']
   }
},
{
  timestamps: true,  
},
)

module.exports = mongoose.model('todoapplist',todolist)