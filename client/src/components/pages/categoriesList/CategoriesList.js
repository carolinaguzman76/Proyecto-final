import React, { Component } from 'react'

import './CategoriesList.css'

// SERVICIO DE LAS CATEGORIAS
import CategoriesServices from '../../../services/category.services'

import CategoryForm from '../categoryForm/CategoryForm'

// IMPORTACION COMPONENTES REACT BOOTSTRAP
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
        this.categoriesServices = new CategoriesServices()
    }
    
    componentDidMount = () => this.getAllCategories()
    
    getAllCategories = () => {
        this.categoriesServices.getAllCategories()
        .then(allCategories => {
            this.setState({ categories: allCategories })
        })
        .catch(err => console.log(err))
    }
    
    deleteOneCategory = (id) => {
        this.categoriesServices.deleteCategory(id)
        .then(() => this.getAllCategories())
        .catch(err => console.log("error", err))
    }
    
    // APERTURA Y CIERRE VENTANA MODAL
    closeModal = () => this.setState({ showmodal: false })
    openModal = () => this.setState({ showmodal: true })
    
    render() { 
        console.log(this.state.categories)

        return (
            <Container>

                <h1>Aqui tiene que mostrar una lista de categorias</h1>
                <h2>Las categorias te ayudan a organizar mejor los movimientos</h2>
                <p>Recuerda que son obligatorias</p>

                {this.props.loggedInUser && <Button className="mb-20" variant="dark" onClick={this.openModal}>Alta nueva Categoria</Button>}

                {this.state.categories.length ? (
                    <Row>
                    
                            <div>{this.state.categories.map((elm, idx) => <div style={{display: 'flex'}} key={idx}>{elm.name} <Button onClick={()=>this.deleteOneCategory(elm._id)}>Elimina</Button></div>)}
                            </div>
                            
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