const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movementSchema = new Schema({
    name: String,
    description: String,
    category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    date: Date,
    typePayment: [{ type: Schema.Types.ObjectId, ref: 'TypePayment' }],
    image: String
}, {
    timestamps: true
})

const movementModel = mongoose.model('Movement', movementSchema)
module.exports = movementModel