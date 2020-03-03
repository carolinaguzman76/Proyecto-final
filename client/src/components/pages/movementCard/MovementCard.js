import React from 'react'

import './MovementCard.css'

import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { Link } from 'react-router-dom'

const MovementCard = ({ name, amount, date, _id }) => {
    return (
        <Col md={4}>
            <Card className="card-rusa">
                <Card.Body>
                <div>{date}</div>
                <div>{name}</div>
                <div>{amount}</div>
                    {/* <Card.Title>{name}</Card.Title>
                    <Card.Text>{amount}</Card.Text>
                    <Card.Text>{date}</Card.Text> */}
                    <Button as="div" variant="dark" size="sm">
                        <Link to={`/details/${_id}`}>Saber más...</Link>
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default MovementCard