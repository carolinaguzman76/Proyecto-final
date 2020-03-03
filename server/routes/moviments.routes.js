const express = require('express')
const router = express.Router()

const Moviment = require('../models/Movement.model')

// router.get('/getAllCoasters', (req, res, next) => {
//   Coaster.find()
//     .then(allCoasters => res.json(allCoasters))
//     .catch(err => console.log(err))
// })

router.get('/getAllMoviments', (req, res, nest) => {
  Moviment.find()
  .then(allMoviments => res.json(allMoviments))
  .catch(err => console.log(err))
})

// router.get('/getOneCoaster/:id', (req, res, next) => {
//   Coaster.findById(req.params.id)
//     .then(theCoaster => res.json(theCoaster))
//     .catch(err => console.log(err))
// })


// ALTA NUEVO MOVIMIENTO
router.post('/new', (req, res, next) => {
  Moviment.create(req.body)
    .then(oneMoviment => res.json(oneMoviment))
    .catch(err => console.log(err))
})



module.exports = router