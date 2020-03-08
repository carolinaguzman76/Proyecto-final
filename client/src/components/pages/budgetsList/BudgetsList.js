import React, { Component } from 'react'

import './BudgetsList.css'

// SERVICIO DE LOS PRESUPUESTOS
import BudgetsServices from '../../../services/budget.services'

// IMPORTACION COMPONENTES REACT BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

class BudgetsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            budgets: []
        }
        this.budgetsServices = new BudgetsServices()
    }
    
    componentDidMount = () => this.getAllBudgets()
    
    getAllBudgets = () => {
        this.budgetsServices.getAllBudgets()
        .then(allBudgets => {
            this.setState({ budgets: allBudgets })
        })
        .catch(err => console.log(err))
    }
    
    deleteOneBudget = (id) => {
        this.budgetsServices.deleteBudget(id)
        .then(() => this.getAllBudgets())
        .catch(err => console.log("error", err))
    }
    
    
    render() { 
     //   console.log(this.state.budgets)

        return (
            <Container>

                <h1>Aqui tiene que mostrar una lista de presupuestos</h1>
                <p>Al dar de alta un presupuesto se genera una categoria del mismo nombre.</p>

                {this.props.loggedInUser && <Button className="mb-20" variant="dark" onClick={this.openModal}>Alta nuevo Presupuesto/Categoria</Button>}

                {this.state.budgets.length ? (
                    <Row>
                    
                            <div>{this.state.budgets.map((elm, idx) => <div style={{display: 'flex'}} key={idx}>{elm.name} <Button onClick={()=>this.deleteOneBudget(elm._id)}>Eliminar</Button></div>)}
                            </div>
                            
                    </Row>
                )
                    :
                    <p>UN POQUITO DE PACIENCIA...</p>

                }

            </Container>
        )
    }
}

export default BudgetsList