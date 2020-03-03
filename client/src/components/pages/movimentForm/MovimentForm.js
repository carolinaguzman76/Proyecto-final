import React, { Component } from 'react'

import './MovimentForm.css'

import MovimentsServices from '../../../services/moviment.services'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import FilesServices from '../../../services/files.services'

class MovimentForm extends Component {

    constructor(props) {
        super(props)
        this.movimentServices = new MovimentsServices()
        this.filesServices = new FilesServices()
        this.state = {
            moviment: {
                name: '',
                description: '',
                category: '',
                date: '',
                typePayment: '',
                image: ''
            }
        }
    }

    finishAction = () => {
        this.props.closeModal()
        this.props.refreshList()
    }

    postMoviment = () => {
        this.movimentServices.postMoviment(this.state.moviment)
            .then(() => this.finishAction())
            .catch(err => console.log(err))
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            moviment: { ...this.state.moviment, [name]: value }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.postMoviment()
    }

    handleFileUpload = e => {
        const uploadData = new FormData()
        uploadData.append("image", e.target.files[0])
        this.filesServices.handleUpload(uploadData)
            .then(response => {
                console.log('Subida de archivo finalizada! La URL de Cloudinray es: ', response.secure_url)
                this.setState({
                    moviment: { ...this.state.moviment, image: response.secure_url }
                })
            })
            .catch(err => console.log(err))
    }

    render() {

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="name" value={this.state.moviment.name} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name="description" value={this.state.moviment.description} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fecha</Form.Label>
                    <Form.Control type="date" name="date" value={this.state.moviment.date} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control type="text" name="category" value={this.state.moviment.category} onChange={this.handleChange} />
                </Form.Group>
                 <Form.Group>
                    <Form.Label>Forma de pago/cobro</Form.Label>
                    <Form.Control type="text" name="typePayment" value={this.state.moviment.typePayment} onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Archivo</Form.Label>
                    <Form.Control type="file" name="image" onChange={this.handleFileUpload} />
                    {/* <Form.Control type="text" name="imageUrl" value={this.state.coaster.imageUrl} onChange={this.handleChange} /> */}
                </Form.Group>

                <Button variant="dark" type="submit">Crear nuevo movimiento</Button>
            </Form>
        )
    }
}

export default MovimentForm