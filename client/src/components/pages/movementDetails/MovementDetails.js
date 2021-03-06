import React, { Component } from 'react'

import MovementsServices from '../../../services/movement.services'

import './MovementDetails.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import { Link } from 'react-router-dom'

class MovementDetails extends Component {

    constructor(props) {
        super(props)
        this.state = { movement: undefined }
        this.movemensServices = new MovementsServices()

        console.log('las props por defecto serían estas:', this.props)
    }

    componentDidMount = () => this.getMovementDetails()

    getMovementDetails = () => {
        this.movemensServices.getMovementDetails(this.props.match.params.id)
            .then(oneMovement => {
                this.setState({ movement: oneMovement })
            })
            .catch(err => console.log(err))
    }

    deleteOneMovement = () => {
        this.movemensServices.deleteMovement(this.props.match.params.id)
        .then(elm => {
            this.props.history.push('/list')
        } )
        .catch(err => console.log(err))
    }


    render() {
        return (
            <Container className="movement-details">
                {this.state.movement ? (
                    <Row>
                        <h1>{this.state.movement.name}</h1>
                        <Col md={{ span: 4, offset: 1 }}>
                            <hr></hr>
                            <p>Descripción: {this.state.movement.description}</p>
                            <p>Importe: {this.state.movement.amount}</p>
                            <p>Date: {this.state.movement.date}</p>
                            <p>Categoria: {this.state.movement.category.name}</p>
                            <p>Tipo de pago/cobro: {this.state.movement.typePayment}</p>
                            <buttom onClick={this.deleteOneMovement}>Eliminar</buttom>
                        </Col>
                        <Col md={{ span: 5, offset: 1 }}>
                            <img src={this.state.movement.imageUrl} alt={this.state.movement.name}></img>
                        </Col>
                    </Row>
                )
                    :
                    <Spinner animation="grow" variant="info" />

                }
                <Button as="div" variant="dark" size="sm">
                    <Link to="/list">Volver</Link>
                </Button>
            </Container>
        )
    }
}

export default MovementDetails

