import React, { Component } from 'react'

import MovementsServices from '../../../services/movement.services'

import './MovementDetails.css'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'

class MovementDetails extends Component {

    constructor(props) {
        super(props)
        this.state = { movement: {} }
        this.services = new MovementsServices()

        console.log('las props por defecto serían estas:', this.props)
    }

    componentDidMount = () => this.getMovementDetails()

    getMovementDetails = () => {
        this.services.getMovementDetails(this.props.match.params.id)
            .then(oneMovement => this.setState({ movement: oneMovement }))
            .catch(err => console.log(err))
    }

    render() {

        return (
            <Container className="movement-details">
                <h1>{this.state.movement.name}</h1>
                <Row>
                    <Col md={{ span: 4, offset: 1 }}>
                        <hr></hr>
                        <p>Descripción: {this.state.movement.description}</p>
                        <p>Importe: {this.state.movement.amount}</p>
                        <p>Date: {this.state.movement.date}</p>
                        <p>Categoria: {this.state.movement.category}</p>
                        <p>Tipo de pago/cobro: {this.state.movement.typePayment}</p>
                    </Col>
                    <Col md={{ span: 5, offset: 1 }}>
                        <img src={this.state.movement.image} alt={this.state.movement.name}></img>
                    </Col>
                </Row>
                <Button as="div" variant="dark" size="sm">
                    <Link to="/list">Volver</Link>
                </Button>
            </Container>
        )
    }
}

export default MovementDetails