const express = require('express')
const router = express.Router()

const TypePayment = require('../models/TypePayment.model')

// BUSQUEDA TODAS LAS FORMAS DE PAGO-COBRO
router.get('/getAllTypesPayment', (req, res, next) => {
  TypePayment.find()
  .then(allTypesPayment => res.json(allTypesPayment))
  .catch(err => next(new Error(err)))
})

// ALTA NUEVA FORMA DE PAGO-COBRO
router.post('/typePaymentNew', (req, res, next) => {
  TypePayment.create(req.body)
    .then(oneTypePayment => res.json(oneTypePayment))
    .catch(err => next(new Error(err)))
})

// ELIMINAR FORMA DE PAGO-COBRO
router.get('/deleteTypePayment/:id', (req, res, next) => {
  TypePayment.findByIdAndDelete(req.params.id)
    .then(() => res.json({status:'ok'}))
    .catch(err => next(new Error(err)))
})

module.exports = router