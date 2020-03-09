import React, { Component } from 'react'

import './MovementForm.css'

import MovementsServices from '../../../services/movement.services'
import FilesServices from '../../../services/files.services'
import CategoriesServices from '../../../services/category.services'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class MovementForm extends Component {

    constructor(props) {
        super(props)
        this.movementServices = new MovementsServices()
        this.filesServices = new FilesServices()
        this.categoriesServices = new CategoriesServices()
        this.state = {
            movement: {
                name: '',
                description: '',
                amount: '',
                category: [],
                date: '',
                typePayment: '',
                image: ''
            },
            categories : []
        }
    }

    componentDidMount = () => this.getAllCategories()

    finishAction = () => {
        this.props.closeModal()
        this.props.refreshList()
    }

    postMovement = () => {
        this.movementServices.postMovement(this.state.movement)
            .then(() => this.finishAction())
            .catch(err => console.log(err))
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            movement: { ...this.state.movement, [name]: value }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.postMovement()
    }

    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("image", e.target.files[0])
        this.filesServices.handleUpload(uploadData)
            .then(response => {
                console.log('Subida de archivo finalizada! La URL de Cloudinray es: ', response.secure_url)
                this.setState({
                    movement: { ...this.state.movement, image: response.secure_url }
                })
            })
            .catch(err => console.log(err))
    }

    getAllCategories = () => {
        this.categoriesServices.getAllCategories()
            .then(allCategories => {
                console.log("TESTTTTT")
                console.log(allCategories)
                this.setState({ categories: allCategories })
            })
            .catch(err => console.log(err))
    }

    render() {

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="name" value={this.state.movement.name} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Importe</Form.Label>
                    <Form.Control type="number" name="amount" value={this.state.movement.amount} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name="description" value={this.state.movement.description} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type="date" name="date" value={this.state.movement.date} onChange={this.handleChange} />
                </Form.Group>
                {/* <Form.Group>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control type="text" name="category" value={this.state.movement.category} onChange={this.handleChange} />
                </Form.Group> */}
                <label>Categoria a la que pertenece:</label>
                <select name="category">
                    <option>Seleccionar</option>
                
                    {this.state.categories.map(elm => <option key={elm._id} value={elm.name}>{elm.name}</option>)}
                
                        
                </select>
                <Form.Group>
                    <Form.Label>Archivo</Form.Label>
                    <Form.Control type="file" name="image" onChange={this.handleFileUpload} />

                    {/* <Form.Control type="file" name="image" value={this.state.movement.image} onChange={this.handleChange} /> */}
                </Form.Group>

                <Button variant="dark" type="submit">Crear nuevo movimiento</Button>
            </Form>
        )
    }
}

export default MovementForm