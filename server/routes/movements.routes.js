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

// COMO ESTABA HECHO
// router.post('/new', (req, res, next) => {
//   Movement.create(req.body)
//     .then(oneMovement => res.json(oneMovement))
//     .catch(err => next(new Error(err)))
// })

// TRAIDO DE MADRIZ DE CINE
// router.get('/new',(req,res) => res.render('met/met-new'))

// router.post('/new',uploadCloud.single("phototoupload"),(req,res) => {

// let {name,description,place,date,hour} = req.body

// let metId

//   Met.create({name,description,place,hour,date,path:req.file.secure_url,user:req.user._id})
//       .then(theMet => metId=theMet._id)
//       .then(x => {
//         let addMeeting = {$push:{meeting:metId}}
//         User.findByIdAndUpdate(req.user._id,addMeeting)
//         .then(x=>res.redirect('/met'))
//         .catch(err=>console.log(err))
//       })
//       .catch(err => console.log("Ha ocurrido un error creando encuentros en la base de datos",err))  
// })

router.post('/new', (req, res, next) => {
  let { name, description, amount, date, typePayment, image, category } = req.body
  let movementId

  Category.findOne({name: req.body.category })
    .then(category => {
      Movement.create({ name, description, amount, date, typePayment, image, category: category._id })
      .then(movement => {
        console.log("esta es la categoria ....", category)
        let addMovement = { $push: { movements: movement._id } }
        Category.findByIdAndUpdate(category._id, addMovement, {new:true})
          .then(oneMovement => res.json(oneMovement))
          .catch(err => next(new Error(err)))
      })

    })
    // .then(oneMovement => movementId = oneMovement._id)
    
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
    .populate('category_id')
    .then(oneMovement => res.json(oneMovement))
    .catch(err => next(new Error(err)))
})


module.exports = router