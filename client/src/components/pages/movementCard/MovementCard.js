import React from 'react'

import './MovementCard.css'

import MovementsServices from '../../../services/movement.services'

import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { Link } from 'react-router-dom'

const MovementCard = ({ name, amount, date, _id, updatedList }) => {

    const services = new MovementsServices()

    const deleteOneMovement = () => {
        services.deleteMovement(_id)
            .then(() => updatedList())
            .catch(err => console.log("error", err))
    }

    return (
        <Col md={4}>
            <Card className="card-rusa">
                <Card.Body>
                    <div>{date}</div>
                    <div>{name}</div>
                    <div>{amount}</div>
                    <Button as="div" variant="dark" size="sm">
                        <Link to={`/details/${_id}`}>Saber mas...</Link>
                    </Button>
                    <Button as="div" variant="dark" size="sm" onClick={deleteOneMovement}>
                        Eliminar
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default MovementCard