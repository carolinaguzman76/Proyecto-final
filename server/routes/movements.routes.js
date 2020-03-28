const express = require('express')
const router = express.Router()

const Movement = require('../models/Movement.model')
const Category = require('../models/Category.model')
const TypePayment = require('../models/TypePayment.model')


// BUSQUEDA TODOS LOS MOVIMIENTOS
router.get('/getAllMovements', (req, res, next) => {
  Movement.find().sort({ date: -1 })
    .populate('category_id')
    .then(allMovements => res.json(allMovements))
    .catch(err => next(new Error(err)))
})

// ALTA NUEVO MOVIMIENTO
router.post('/new', (req, res, next) => {
  let { name, description, amount, date, typePayment, image, category } = req.body
  let movID
  Movement.create({ name, description, amount, date, typePayment: typePayment, image, category: category })
    .then(oneMovement => {
      movID = oneMovement._id
      res.json(oneMovement)
      return Category.findById(category)
    })
    .then(theCategory => Category.findByIdAndUpdate(category, { $push: { movements: movID }, $set: { amount: parseInt(theCategory.amount, 10) + parseInt(amount, 10)} }, { new: true }))
    .catch(err => next(new Error(err)))
    .then(x => TypePayment.findByIdAndUpdate(typePayment, { $push: { movements: movID } }, { new: true }))
    .catch(err => next(new Error(err)))
})


// ELIMINAR UN MOVIMIENTO
router.get('/deleteMovement/:id', (req, res, next) => {
  Movement.findByIdAndDelete(req.params.id)
    .then(() => res.json({ status: 'ok' }))
    .catch(err => next(new Error(err)))
})

// DETALLES DE UN MOVIMIENTO
router.get('/getOneMovement/:id', (req, res, next) => {
  Movement.findById(req.params.id)
    .populate('category')
    .then(oneMovement => res.json(oneMovement))
    .catch(err => next(new Error(err)))
})


module.exports = router
