import React from 'react'

import './MovementCard.css'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const MovementCard = ({ name, amount, date, _id, updatedList }) => {

    let options = { year: 'numeric', month: 'long', day: 'numeric' }
    let dateFormat = new Date(date).toLocaleDateString("es-ES", options)

    return (

        <Col md={12} className="cardMoviment">
            <Card>
                <Card.Header>{name}</Card.Header>
                <Card.Body>
                    <Card.Title>{amount} euros</Card.Title>
                    <Card.Text>
                        {dateFormat}
                    </Card.Text>
                    <Card.Link href={`/details/${_id}`}>Saber mas...</Card.Link>
                </Card.Body>
            </Card>
            <Card></Card>
        </Col>

    )
}

export default MovementCard