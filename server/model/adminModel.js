const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    image : {type: String},
    category: { type: String} ,
    bestseller: {type: Boolean, default: false}
});

const adminModel = mongoose.model('admin', adminSchema)
 
 module.exports = adminModel