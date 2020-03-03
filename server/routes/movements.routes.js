const express = require('express')
const router = express.Router()

const Movement = require('../models/Movement.model')

// BUSQUEDA TODOS LOS MOVIMIENTOS
router.get('/getAllMovements', (req, res, nest) => {
  Movement.find()
  .then(allMovements => res.json(allMovements))
  .catch(err => console.log(err))
})

// router.get('/getOneCoaster/:id', (req, res, next) => {
//   Coaster.findById(req.params.id)
//     .then(theCoaster => res.json(theCoaster))
//     .catch(err => console.log(err))
// })

// DETALLES DE UN MOVIMIENTO
router.get('/getOneMovement/:id', (req, res, next) => {
  Movement.findById(req.params.id)
    .then(oneMovement => res.json(oneMovement))
    .catch(err => console.log(err))
})


// ALTA NUEVO MOVIMIENTO
router.post('/new', (req, res, next) => {
  Movement.create(req.body)
    .then(oneMovEment => res.json(oneMovEment))
    .catch(err => console.log(err))
})



module.exports = router