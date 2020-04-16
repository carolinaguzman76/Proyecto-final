import React, { Component } from 'react'

import './NavBar.css'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import AuthServices from '../../services/auth.services'

import { Link, withRouter} from 'react-router-dom'



class Navigation extends Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.authServices = new AuthServices()
    }

    logout = () => {
        this.authServices.logout()
            .then(response => {
                this.props.setTheUser(false)
                this.props.history.push("/login")
            })
            .catch(err => console.log(err))
    }


    render() {

        const greeting = this.props.loggedInUser ? <>Hola, {this.props.loggedInUser.username}</> : <>Hola, ahorrador!</>


        return (


            this.props.loggedInUser ?
                (
                    <Navbar bg="dark" expand="lg" variant="dark">
                        <img
                            src="../hucha.png"
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />

                        <Navbar.Brand href="#home">Ahorra, coño!</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link as="div"> <Link to="/">Inicio</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/profile">Perfil</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/list">Movimientos</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/categoriesList">Categorias</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/typesPaymentList">Tipos de pago/cobro</Link></Nav.Link>
                                <Nav.Link as="div" onClick={this.logout}>Cerrar sesión</Nav.Link>
                                <Nav.Link as="div">{greeting}</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                )
                :
                (
                    <Navbar bg="dark" expand="lg" variant="dark">
                        <Navbar.Brand href="#home">Te ayudo a ahorrar!</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link as="div"> <Link to="/">Inicio</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/signup">Registro</Link></Nav.Link>
                                <Nav.Link as="div"> <Link to="/login">Inicio sesión</Link></Nav.Link>
                                <Nav.Link as="small">{greeting}</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                )
        )
    }
}

export default withRouter(Navigation)