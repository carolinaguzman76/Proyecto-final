const express = require('express')
const router = express.Router()

const Category = require('../models/Category.model')

// BUSQUEDA TODOS LAS CATEGORIAS
router.get('/getAllCategories', (req, res, next) => {
  Category.find()
    .then(allCategories => res.json(allCategories))
    .catch(err => next(new Error(err)))
})

// BUSQUEDA MOVIMIENTOS UNA CATEGORIA
router.get('/getOneCategory/:id', (req, res, next) => {
  Category.find({ "_id": req.params.id }).sort({ date: -1 })
    .populate('movements')
    .then(foundMovements => {
      console.log("estoy en getOneCategory")
      console.log(foundMovements[0])
      res.json(foundMovements)
    })
    .catch(err => next(new Error(err)))
})

// ALTA NUEVA CATEGORIA
router.post('/categoryNew', (req, res, next) => {

  let objectCategory = {
    name: req.body.name,
    amount: 0,
    budget: req.body.budget
  }

  Category.create(objectCategory)
    .then(oneCategory => res.json(oneCategory))
    .catch(err => next(new Error(err)))

})

// ELIMINAR UNA CATEGORIA
router.get('/deleteCategory/:id', (req, res, next) => {
  Category.findByIdAndDelete(req.params.id)
    .then(() => res.json({ status: 'ok' })
      .catch(err => next(new Error(err)))
    )
})

module.exports = router