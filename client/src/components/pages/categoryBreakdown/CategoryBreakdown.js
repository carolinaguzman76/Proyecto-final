import React, { Component } from 'react'

import './CategoryBreakdown.css'

import CategoriesServices from '../../../services/category.services'

import MovementCard from '../movementCard/MovementCard'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

class CategoryBreakdown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movementsBreakdown: [],
            showmodal: false
        }
        //INSTANCIA DE LOS SERVICIOS DE CATEGORIAS
        this.categoriesServices = new CategoriesServices()
    }

    componentDidMount = () => this.getOneCategory()

    getOneCategory = () => {
        console.log("buscando id", this.props.match.params.id)
        this.categoriesServices.getOneCategory(this.props.match.params.id)
            .then(allMovements => {console.log("getonecategory", allMovements[0])
                this.setState({ movementsBreakdown: allMovements })})
            .catch(err => console.log(err))
    }

    render() {

        console.log("dentro del render", this.state.movementsBreakdown[0])
        return (
            <Container>

                <h1>Aqui tiene que mostrar una lista de movimientos de una sola categoria</h1>

                <Button className="mb-20" variant="dark" href="/categoriesList">Categorias</Button>

                {this.state.movementsBreakdown.length ? (
                    <Row>
                        {this.state.movementsBreakdown[0].movements.map(elm => <MovementCard key={elm._id} {...elm} updatedList={this.getOneCategory} />)}
                    </Row>
                )
                    :
                    <p>UN POQUITO DE PACIENCIA...</p>

                }

            </Container>
        )
    }
}

export default CategoryBreakdown