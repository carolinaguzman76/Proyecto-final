const express = require('express')
const router = express.Router()

const Movement = require('../models/Movement.model')

// BUSQUEDA TODOS LOS MOVIMIENTOS
router.get('/getAllMovements', (req, res, next) => {
  Movement.find().sort({date:-1})
  .then(allMovements => res.json(allMovements))
  .catch(err => next(new Error(err)))
})

// ALTA NUEVO MOVIMIENTO
router.post('/new', (req, res, next) => {
  Movement.create(req.body)
    .then(oneMovement => res.json(oneMovement))
    .catch(err => next(new Error(err)))
})

// ELIMINAR UN MOVIMIENTO
router.get('/deleteMovement/:id', (req, res, next) => {
  Movement.findByIdAndDelete(req.params.id)
    .then(() => res.json({status:'ok'}))
    .catch(err => next(new Error(err)))
})

// DETALLES DE UN MOVIMIENTO
router.get('/getOneMovement/:id', (req, res, next) => {
  Movement.findById(req.params.id)
    .then(oneMovement => res.json(oneMovement))
    .catch(err => next(new Error(err)))
})


module.exports = router