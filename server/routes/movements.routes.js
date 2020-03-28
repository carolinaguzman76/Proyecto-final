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
  console.log(req.body)
  Movement.create({ name, description, amount, date, typePayment: typePayment, image, category: category })
    .then(oneMovement => {
      Category.findById(category)
        .then(theCategory => {
          const newTotal = theCategory.amount + amount
          Category.findByIdAndUpdate(category, { $push: { movements: oneMovement._id }, $set: {amount: newTotal}}, { new: true })
          .then(updatedCategory => console.log(updatedCategory))
          .catch(err => next(new Error(err)))
        })

      TypePayment.findByIdAndUpdate(typePayment, { $push: { movements: oneMovement._id } }, { new: true })
        // .then(thePayment => console.log("sin res.json"))
        .catch(err => next(new Error(err)))

        res.json(oneMovement)
    }
    
    )
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
