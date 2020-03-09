const express = require('express')
const router = express.Router()

const Movement = require('../models/Movement.model')
const Category = require('../models/Category.model')

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

  Category.findOne({name: req.body.category })
    .then(category => {
      Movement.create({ name, description, amount, date, typePayment, image, category: category._id })
      .then(movement => {
        let addMovement = { $push: { movements: movement._id } }
        Category.findByIdAndUpdate(category._id, addMovement, {new:true})
          .then(oneMovement => res.json(oneMovement))
          .catch(err => next(new Error(err)))
      })
    })
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