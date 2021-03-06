import React, { Component } from 'react'

import './MovemenstList.css'

import MovementsServices from '../../../services/movement.services'

import MovementForm from '../movementForm/MovementForm'
import MovementCard from '../movementCard/MovementCard'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

class MovementsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movements: [],
            showmodal: false
        }
        //INSTANCIA DE LOS SERVICIOS DE MOVIMIENTOS
        this.movementsServices = new MovementsServices()
    }

    componentDidMount = () => this.getAllMovements()

    getAllMovements = (year, month, day) => {
        this.movementsServices.getAllMovements()
            .then(allMovements => {
                this.setState({ movements: allMovements })})
            .catch(err => console.log(err))
    }

    // APERTURA Y CIERRE VENTANA MODAL
    closeModal = () => this.setState({ showmodal: false })
    openModal = () => this.setState({ showmodal: true })

    render() {

        return (
            <Container>

                <h1>Aqui tiene que mostrar una lista de movimientos</h1>

                <Button className="btn"  href="/categoriesList">Categorias</Button>

                {this.props.loggedInUser && <Button className="mb-btn" onClick={this.openModal}>Alta nuevo movimiento</Button>}

                {this.state.movements.length ? (
                    <Row>
                        {this.state.movements.map(elm => <MovementCard key={elm._id} {...elm} updatedList={this.getAllMovements} />)}
                    </Row>
                )
                    :
                    <Spinner animation="grow" variant="info" />

                }

                <Modal show={this.state.showmodal} onHide={this.closeModal}>
                    <Modal.Body>
                        <h3>Nuevo movimiento</h3>
                        <hr></hr>
                        <MovementForm closeModal={this.closeModal} refreshList={this.getAllMovements} />
                    </Modal.Body>
                </Modal>

            </Container>
        )
    }
}

export default MovementsList