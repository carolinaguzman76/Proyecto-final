const mongoose = require('mongoose')
const Schema = mongoose.Schema

const typePaymentSchema = new Schema({
    name: String
}, {
    timestamps: true
})

const typePaymentModel = mongoose.model('TypePayment', typePaymentSchema)
module.exports = typePaymentModel