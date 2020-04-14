import React from 'react'

import './Profile.css'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import BarGraphic from '../../auxiliary/BarGraphic';

const Profile = props => {

    console.log("estas son las props", props)

    let balanceCategories = () => {
        let income = props.income
        let expenses = props.expenses
        let balance = income - expenses

        return balance
    }

    let messageBalance = balanceCategories < props.income / 2 && balanceCategories >= props.income / 4 ? <p>Donde vas loco que te has gastado la mitad de tu pasta!</p> :
    balanceCategories < props.income / 4 ? <p>Activado nivel: tieso</p> :
        <p className="messageMotivating">Asegurate que te dura todo el mes, que tienes la mano muy suelta...</p>

    return (


        <>
            <h2>Hola {props.loggedInUser.username}, esta es tu situación económica!</h2>

            <Container>
                <Row>
                    <Col>Ingresos...   {props.income}</Col>
                    <Col>Gastos...   {props.expenses}</Col>
                </Row>

                <h3>Este es tu saldo {balanceCategories()}</h3>

                {messageBalance}

                <Button className="mb-20" variant="dark" href="/list">Movimientos</Button>

            </Container>

            <Container>

                <h3>Echale un ojo a lo que has hecho con tu presupuesto</h3>

                <BarGraphic></BarGraphic>

            </Container>
        </>
    )
}

export default Profile