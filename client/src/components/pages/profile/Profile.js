import React from 'react'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Profile = props => {

    console.log(props)
    return (
        <>
            <h2>Hola {props.loggedInUser.username}, esta es tu situación económica!</h2>

            <Container>
                <Row>
                    <Col>Ingresos...   {props.income}</Col>
                    <Col>Gastos...   {props.expenses}</Col>
                </Row>

                <h3>Aqui debe ir el saldo a dia de hoy...</h3>

                <Button className="mb-20" variant="dark" href="/list">Movimientos</Button>

            </Container>

            <Container>

                <h3>Aqui debe ir la grafica de los presupuestos</h3>

                <Button className="mb-20" variant="dark" href="/budget">Presupuestos</Button>

            </Container>
        </>
    )
}

export default Profile