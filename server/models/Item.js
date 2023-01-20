const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    quantity: {type: Number, required: true, minimum: 0},
    timestamp: {type: String, default: Date.now()}
})

const Item = mongoose.model("Item", ItemSchema)
module.exports = Item