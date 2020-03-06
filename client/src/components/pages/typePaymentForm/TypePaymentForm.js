import React, { Component } from 'react'

import './TypePaymentForm.css'

// SERVICIO TIPOS DE PAGO/COBRO
import TypesPaymentServices from '../../../services/typePayment.services'

// ELEMENTOS REACT BOOTSTRAP
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class TypePaymentForm extends Component {

    constructor(props) {
        super(props)
        this.typesPaymentServices = new TypesPaymentServices()
        this.state = {
            typePayment: {
                name: ''
            }
        }
    }

    // APERTURA Y CIERRE DE VENTANA MODAL
    finishAction = () => {
        this.props.closeModal()
        this.props.refreshList()
    }

    postTypePayment = () => {
        this.typesPaymentServices.postTypePayment(this.state.typePayment)
            .then(() => this.finishAction())
            .catch(err => console.log(err))
    }

    handleChange = e => {
        let { name, value } = e.target
        this.setState({
            typePayment: { ...this.state.typePayment, [name]: value }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.postTypePayment()
    }

    render() {

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="name" value={this.state.typePayment.name} onChange={this.handleChange} />
                </Form.Group>

                <Button variant="dark" type="submit">Crear nueva forma de pago/cobro</Button>
            </Form>
        )
    }
}

export default TypePaymentForm