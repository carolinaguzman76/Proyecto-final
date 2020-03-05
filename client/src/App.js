import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom'

import NavBar from './components/auxiliary/NavBar'

import Signup from './components/pages/auth/signup/Signup'
import Profile from './components/pages/profile/Profile'
import Login from './components/pages/auth/login/Login'

import CategoriesList from './components/pages/categoriesList/CategoriesList'

import MovimientsList from './components/pages/movementsList/MovementsList'
import MovementDetails from './components/pages/movementDetails/MovementDetails'

import AuthServices from './services/auth.services'

class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: false }
    this.services = new AuthServices()
  }


  // componentDidUpdate = (prevProps, prevState) => console.log("El estado de App se ha actualizado:", this.state)
  componentDidMount = () => this.fetchUser()


  setTheUser = userObj => this.setState({ loggedInUser: userObj })
  fetchUser = () => {
    this.services.loggedin()
      .then(theUser => this.setState({ loggedInUser: theUser }))
      .catch(() => this.setState({ loggedInUser: false }))
  }


  render() {
    console.log(this.state.loggedInUser)

    return (
      <>
        <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

        <Switch>
          <Route path="/categoriesList" render={() => <CategoriesList loggedInUser={this.state.loggedInUser} />} />
          <Route path="/list" render={() => <MovimientsList loggedInUser={this.state.loggedInUser} />} />
          <Route path="/details/:id" render={props => <MovementDetails {...props} />} />
          {/* <Route path="/budget" render={() => <BudgetsList loggedInUser={this.state.loggedInUser} />} /> */}
          <Route path="/signup" render={() => <Signup setTheUser={this.setTheUser} />} />
          <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
          <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
        </Switch>

        <h1>Si sale solo esto, estas en app</h1>
      </>

    )
  }
}


export default App