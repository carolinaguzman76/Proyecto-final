import React, { Component } from 'react'

import './CategoriesList.css'

import CategoriesServices from '../../../services/category.services'

import CategoryForm from '../categoryForm/CategoryForm'
// import MovementCard from '../movementCard/MovementCard'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class CategoriesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            showmodal: false
        }
        this.services = new CategoriesServices()
    }

    componentDidMount = () => this.getAllCategories()

    getAllCategories = () => {
        this.services.getAllCategories()
            .then(allCategories => {
                this.setState({ categories: allCategories })
            })
            .catch(err => console.log(err))
    }

    deleteOneCategory = () => {
        this.services.deleteCategory(this.state.categories._id)
            .then(() => this.getAllCategories())
            .catch(err => console.log("error", err))
    }

    // APERTURA Y CIERRE VENTANA MODAL
    closeModal = () => this.setState({ showmodal: false })
    openModal = () => this.setState({ showmodal: true })

    render() { 

        return (
            <Container>

                <h1>Aqui tiene que mostrar una lista de categorias</h1>
                <h2>Las categorias te ayudan a organizar mejor los movimientos</h2>
                <p>Recuerda que son obligatorias</p>

                {this.props.loggedInUser && <Button className="mb-20" variant="dark" onClick={this.openModal}>Alta nueva Categoria</Button>}

                {this.state.categories.length ? (
                    <Row>
                        <ul>
                            <li>
                            <div>{this.state.categories.map((elm, idx) => <div key={idx}>{elm.name}</div>)}
                            <Button as="div" variant="dark" size="sm" onClick={this.deleteOneCategory}>
                             Eliminar
                            </Button>
                            </div>
                            </li>
                            
                        </ul>
                        

                    </Row>
                )
                    :
                    <p>UN POQUITO DE PACIENCIA...</p>

                }

                <Modal show={this.state.showmodal} onHide={this.closeModal}>
                    <Modal.Body>
                        <h3>Nueva categoria</h3>
                        <hr></hr>
                        <CategoryForm closeModal={this.closeModal} refreshList={this.getAllCategories} />
                    </Modal.Body>
                </Modal>

            </Container>
        )
    }
}

export default CategoriesList