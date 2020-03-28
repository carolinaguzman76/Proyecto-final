import React, { Component } from 'react'

import './TypesPaymentList.css'

// SERVICIO DE LOS TIPOS DE PAGO-COBRO
import TypesPaymentServices from '../../../services/typePayment.services'

import TypePaymentForm from '../typePaymentForm/TypePaymentForm'

// IMPORTACION COMPONENTES REACT BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import ListGroup from 'react-bootstrap/ListGroup'

class TypesPaymentList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            typesPayment: [],
            showmodal: false
        }
        this.typesPaymentsServices = new TypesPaymentServices()
    }

    componentDidMount = () => this.getAllTypesPayment()

    getAllTypesPayment = () => {
        this.typesPaymentsServices.getAllTypesPayment()
            .then(allTypesPayment => this.setState({ typesPayment: allTypesPayment }))
            .catch(err => console.log(err))
    }

    deleteOneTypePayment = (id) => {
        this.typesPaymentsServices.deleteTypePayment(id)
            .then(() => this.getAllTypesPayment())
            .catch(err => console.log("error", err))
    }

    // APERTURA Y CIERRE VENTANA MODAL
    closeModal = () => this.setState({ showmodal: false })
    openModal = () => this.setState({ showmodal: true })

    render() {
        console.log(this.state.typesPayment)

        return (
            <Container>

                <h3>Tipos de movimientos pago/cobro</h3>
                <p>Utiliza cualquiera de estos tipos de pago/cobro para completar la información de tus movimientos.</p>

                {this.props.loggedInUser && <Button className="mb-20" variant="dark" onClick={this.openModal}>Alta nuevo tipo</Button>}

                {this.state.typesPayment.length ? (
                    <Row>

                        <ListGroup variant="flush">
                        
                        
                            <ListGroup.Item>
                            {this.state.typesPayment.map((elm, idx) => <div  className="listTypePayment" style={{ display: 'flex' }} key={idx}>{elm.name} <Button onClick={() => this.deleteOneTypePayment(elm._id)}>Eliminar</Button></div>)}
                            </ListGroup.Item>
                        </ListGroup>

                        

                    </Row>
                )
                    :
                    <Spinner animation="grow" variant="info" />

                }

                <Modal show={this.state.showmodal} onHide={this.closeModal}>
                    <Modal.Body>
                        <h3>Nueva tipo</h3>
                        <hr></hr>
                        <TypePaymentForm closeModal={this.closeModal} refreshList={this.getAllTypesPayment} />
                    </Modal.Body>
                </Modal>

            </Container>
        )
    }
}

export default TypesPaymentList