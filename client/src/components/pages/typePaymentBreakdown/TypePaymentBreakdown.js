import React, { Component } from 'react'

import './TypePaymentBreakdown.css'

import TypesPaymentServices from '../../../services/typePayment.services'

import MovementCard from '../movementCard/MovementCard'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

class TypePaymentBreakdown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            typePayment: {
                movements:[]
            },
            showmodal: false
        }
        //INSTANCIA DE LOS SERVICIOS DE TIPOS DE PAGO-COBRO
        this.typesPaymentServices = new TypesPaymentServices()
    }

    componentDidMount = () => this.getOneTypePayment()

    getOneTypePayment = () => {
        console.log("buscando id", this.props.match.params.id)
        this.typesPaymentServices.getOneTypePayment(this.props.match.params.id)
            .then(oneTypePayment => {
                console.log("oneTypePayment", oneTypePayment[0])
                this.setState({ typePayment: oneTypePayment[0] })

            })
            .catch(err => console.log(err))
    }

    render() {

        console.log("dentro del render", this.state.typePayment)
        return (
            <Container>

                <h1>Aqui tiene que mostrar una lista de movimientos de un solo tipo de pago</h1>

                <Button className="mb-20" variant="dark" href="/typesPaymentList">Tipos de pago/cobro</Button>

                {this.state.typePayment ? (
                    <Row>
                        {this.state.typePayment.movements.map(elm => <MovementCard key={elm._id} {...elm} updatedList={this.getOneTypePayment} />)}
                    </Row>
                )
                    :
                    <Spinner animation="grow" variant="info" />

                }

            </Container>
        )
    }
}

export default TypePaymentBreakdown