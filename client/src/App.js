import React, { Component } from 'react';

/* ---- STYLING ----  */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/* ---- RDD COMPONENTS ----  */
import { Switch, Route, Redirect } from 'react-router-dom'

/* ---- UI COMPONENTS ----  */
import NavBar from './components/auxiliary/NavBar'


import Signup from './components/pages/auth/signup/Signup'
import Profile from './components/pages/profile/Profile'
import Login from './components/pages/auth/login/Login'

// IMPORTACION COMPONENTES
import BudgetsList from './components/pages/budgetsList/BudgetsList'
import TypesPaymentList from './components/pages/typesPaymentList/TypesPaymentList'
import CategoriesList from './components/pages/categoriesList/CategoriesList'
import MovementsList from './components/pages/movementsList/MovementsList'
import MovementDetails from './components/pages/movementDetails/MovementDetails'

import AuthServices from './services/auth.services'

class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: false }
    this.authServices = new AuthServices()
  }


  // componentDidUpdate = (prevProps, prevState) => console.log("El estado de App se ha actualizado:", this.state)
  componentDidMount = () => this.fetchUser()


  setTheUser = userObj => this.setState({ loggedInUser: userObj })
  fetchUser = () => {
    this.authServices.loggedin()
      .then(theUser => this.setState({ loggedInUser: theUser }))
      .catch(() => this.setState({ loggedInUser: false }))
  }


  render() {
    console.log(this.state.loggedInUser)

    return (
      <>
        <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

        <Switch>
          <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
          <Route path="/signup" render={() => <Signup setTheUser={this.setTheUser} />} />
          <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
          <Route path="/budgetsList" render={() => <BudgetsList loggedInUser={this.state.loggedInUser} />} />
          <Route path="/typesPaymentList" render={() => <TypesPaymentList loggedInUser={this.state.loggedInUser} />} />
          <Route path="/categoriesList" render={() => <CategoriesList loggedInUser={this.state.loggedInUser} />} />
          <Route path="/list" render={() => <MovementsList loggedInUser={this.state.loggedInUser} />} />
          <Route path="/details/:id" render={props => <MovementDetails {...props} />} />
        </Switch>

        <h1>Si sale solo esto, estas en app</h1>
      </>

    )
  }
}


export default App