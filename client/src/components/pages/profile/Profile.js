import React from 'react'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const Profile = props => {
    return (
        <>
            <h1>Soy el perfil de usuario, {props.loggedInUser.username}</h1>

            <Container>

                <h2>Aqui debe ir el saldo a dia de hoy...</h2>

                <Button className="mb-20" variant="dark" href="/list">Movimientos</Button>

            </Container>
        </>
    )
}

export default Profile