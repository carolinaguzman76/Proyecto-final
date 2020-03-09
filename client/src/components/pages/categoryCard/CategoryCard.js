import React from 'react'

import './CategoryCard.css'

import CategoriesServices from '../../../services/category.services'

import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const CategoryCard = ({ name, amount, budget, _id, updatedList}) => {

    const services = new CategoriesServices()

    const deleteOneCategory = () => {
        services.deleteCategory(_id)
            .then(() => updatedList())
            .catch(err => console.log("error", err))
    }

    return (
        <Col md={4}>
            <Card className="card-rusa">
                <Card.Body>
                    <div>{name}</div>
                    <div>{amount}</div>
                    <div>{budget}</div>
                    <Button as="div" variant="dark" size="sm" onClick={deleteOneCategory}>
                        Eliminar
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CategoryCard