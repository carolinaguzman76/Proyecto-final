import React, { Component } from 'react'

import './CategoryBreakdown.css'

import CategoriesServices from '../../../services/category.services'

import MovementCard from '../movementCard/MovementCard'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

class CategoryBreakdown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            category: {
                movements:[]
            },
            showmodal: false
        }
        //INSTANCIA DE LOS SERVICIOS DE CATEGORIAS
        this.categoriesServices = new CategoriesServices()
    }

    componentDidMount = () => this.getOneCategory()

    getOneCategory = () => {
        console.log("buscando id", this.props.match.params.id)
        this.categoriesServices.getOneCategory(this.props.match.params.id)
            .then(oneCategory => {
                console.log("getonecategory", oneCategory[0])
                this.setState({ category: oneCategory[0] })

            })
            .catch(err => console.log(err))
    }

    render() {

        console.log("dentro del render", this.state.category)
    
        return (
            <Container>

                <h1>Estos son los movimientos que componen {}</h1>

                <Button className="mb-20" variant="dark" href="/categoriesList">Categorias</Button>

                {this.state.category ? (
                    <Row>
                        {this.state.category.movements.map(elm => <MovementCard key={elm._id} {...elm} updatedList={this.getOneCategory} />)}
                    </Row>
                )
                    :
                    <Spinner animation="grow" variant="info" />

                }

            </Container>
        )
    }
}

export default CategoryBreakdown