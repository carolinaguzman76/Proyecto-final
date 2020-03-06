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

                <h1>Aqui tiene que mostrar una lista de tipos de pago/cobro</h1>

                {this.props.loggedInUser && <Button className="mb-20" variant="dark" onClick={this.openModal}>Alta nuevo tipo</Button>}

                {this.state.typesPayment.length ? (
                    <Row>
                    
                            <div>{this.state.typesPayment.map((elm, idx) => <div style={{display: 'flex'}} key={idx}>{elm.name} <Button onClick={()=>this.deleteOneTypePayment(elm._id)}>Eliminar</Button></div>)}
                            </div>
                            
                    </Row>
                )
                    :
                    <p>UN POQUITO DE PACIENCIA...</p>

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