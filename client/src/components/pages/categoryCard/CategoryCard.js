import React from 'react'

import './CategoryCard.css'

import CategoriesServices from '../../../services/category.services'

import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

// import { Link } from 'react-router-dom'

const CategoryCard = ({ name, amount, budget, _id, updatedList}) => {

    const services = new CategoriesServices()

    const deleteOneCategory = () => {
        services.deleteCategory(_id)
            .then(() => updatedList())
            .catch(err => console.log("error", err))
    }

    return (
        <Col md={3} className="cardCategory">
            <Card className="card-rusa">
                <Card.Body>
                    <div>{name}</div>
                    <div>Total: {amount}</div>
                    <div>Presupuestado: {budget}</div>
                    <Card.Link href={`/getOneCategory/${_id}`}>Saber mas...</Card.Link>
                    <Button as="div" variant="dark" size="sm" onClick={deleteOneCategory}>
                        Eliminar
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CategoryCard

