const express = require('express')
const router = express.Router()

const Category = require('../models/Category.model')
const Budget = require('../models/Budget.model')

// BUSQUEDA TODOS LAS CATEGORIAS
router.get('/getAllCategories', (req, res, next) => {
  Category.find()
  .then(allCategories => res.json(allCategories))
  .catch(err => next(new Error(err)))
})

// BUSQUEDA TODOS LOS PRESUPUESTOS
router.get('/getAllBudgets', (req, res, next) => {
  Budget.find()
  .then(allButgets => res.json(allButgets))
  .catch(err => next(new Error(err)))
})


// ALTA NUEVA CATEGORIA Y SU PRESUPUESTO
router.post('/categoryNew', (req, res, next) => {

  let objectCategory = {
    name: req.body.name, 
    amount: 0
  }

  

  Category.create(objectCategory)
    .then(oneCategory => res.json(oneCategory))
    .then(Budget.create(req.body))
    .then(oneBudget => res.json(oneBudget))
    .catch(err => next(new Error(err)))
  
})

// ELIMINAR UNA CATEGORIA Y SU PRESUPUESTO
router.get('/deleteCategory/:id', (req, res, next) => {
  Category.findByIdAndDelete(req.params.id)
    .then(deleted=>Budget.findOneAndDelete({name:deleted.name}))
    .then(() => res.json({status:'ok'})
    .catch(err => next(new Error(err)))
)})

module.exports = router