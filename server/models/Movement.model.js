const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movementSchema = new Schema({
    name: String,
    description: String,
    amount: Number,
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    date: Date,
    typePayment: String,
    image: String
}, {
    timestamps: true
})

const movementModel = mongoose.model('Movement', movementSchema)
module.exports = movementModel