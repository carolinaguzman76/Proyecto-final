const mongoose = require('mongoose')
const Schema = mongoose.Schema

const typePaymentSchema = new Schema({
    name: String
}, {
    timestamps: true
})

const typePaymentSchema = mongoose.model('Payment', typePaymentSchema)
module.exports = typePaymentSchema