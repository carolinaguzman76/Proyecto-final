import React, { Component } from 'react'

import './MovimenstList.css'

import MovimentsServices from '../../../services/moviment.services'

import MovimentForm from '../movimentForm/MovimentForm'
import MovimentCard from '../movimentCard/MovimentCard'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class MovimentsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            moviments: [],
            showmodal: false
        }
        this.services = new MovimentsServices()
    }

    componentDidMount = () => this.getAllMoviments()

    getAllMoviments = () => {
        this.services.getAllMoviments()
            .then(allMoviments => this.setState({ moviments: allMoviments }))
            .catch(err => console.log(err))
    }

    // APERTURA Y CIERRE VENTANA MODAL
    closeModal = () => this.setState({ showmodal: false })
    openModal = () => this.setState({ showmodal: true })

    render() {

        return (
            <Container>

                <h1>Aqui tiene que mostrar una lista de movientos</h1>

                {this.props.loggedInUser && <Button className="mb-20" variant="dark" onClick={this.openModal}>Alta nuevo movimiento</Button>}

                {this.state.moviments.length ? (
                    <Row>
                        {this.state.moviments.map(elm => <MovimentCard key={elm._id} {...elm} />)}
                    </Row>
                )
                    :
                    <p>CARGANDO...</p>

                }

                <Modal show={this.state.showmodal} onHide={this.closeModal}>
                    <Modal.Body>
                        <h3>Nuevo movimiento</h3>
                        <hr></hr>
                        <MovimentForm closeModal={this.closeModal} refreshList={this.getAllMoviments} />
                    </Modal.Body>
                </Modal>

            </Container>
        )
    }
}

export default MovimentsList