const mongoose = require('mongoose')
const Schema = mongoose.Schema

const budgetSchema = new Schema({
    name: String
}, {
    timestamps: true
})

const budgetModel = mongoose.model('Budget', budgetSchema)
module.exports = budgetModel