import React, { Component } from 'react';

/* ---- STYLING ----  */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/* ---- AMCHARTS ----*/
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* ---- RDD COMPONENTS ----  */
import { Switch, Route, Redirect } from 'react-router-dom'

/* ---- UI COMPONENTS ----  */
import NavBar from './components/auxiliary/NavBar'
import Signup from './components/pages/auth/signup/Signup'
import Profile from './components/pages/profile/Profile'
import Login from './components/pages/auth/login/Login'

/* ---- CUSTOMS COMPONENTS ---- */
import TypesPaymentList from './components/pages/typesPaymentList/TypesPaymentList'
import CategoriesList from './components/pages/categoriesList/CategoriesList'
import MovementsList from './components/pages/movementsList/MovementsList'
import MovementDetails from './components/pages/movementDetails/MovementDetails'
import CategoryBreakdown from './components/pages/categoryBreakdown/CategoryBreakdown'

import AuthServices from './services/auth.services'
import CategoriesServices from './services/category.services'

am4core.useTheme(am4themes_animated);

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: false,
      income: 0,
      expenses: 0
    }
    this.authServices = new AuthServices()
    this.categoriesServices = new CategoriesServices()
  }


  // componentDidUpdate = (prevProps, prevState) => console.log("El estado de App se ha actualizado:", this.state)
  componentDidMount = () => {
    this.fetchUser()
    this.totalCategoriesIncome()
    this.totalCategoriesExpenses()
  }


  setTheUser = userObj => this.setState({ loggedInUser: userObj })
  fetchUser = () => {
    this.authServices.loggedin()
      .then(theUser => this.setState({ loggedInUser: theUser }))
      .catch(() => this.setState({ loggedInUser: false }))
  }

  totalCategoriesIncome = () => {
    this.categoriesServices.getIncome()
      .then(totalIncome => this.setState({ income: totalIncome }))
      .catch(err => console.log(err))
  }

  totalCategoriesExpenses = () => {
    this.categoriesServices.getExpenses()
      .then(totalExpenses => this.setState({ expenses: totalExpenses }))
      .catch(err => console.log(err))
  }

  

  render() {
    console.log(this.state.loggedInUser)

    return (
      <>
        <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

        <Switch>
          <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} {...this.state.income} {...this.state.expenses}/> : <Redirect to="/" />} />
          <Route path="/signup" render={() => <Signup setTheUser={this.setTheUser} />} />
          <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
          <Route path="/typesPaymentList" render={() => <TypesPaymentList loggedInUser={this.state.loggedInUser} />} />
          <Route path="/categoriesList" render={() => <CategoriesList loggedInUser={this.state.loggedInUser} />} />
          <Route path="/getOneCategory/:id" render={props => <CategoryBreakdown {...props} />} />
          <Route path="/list" render={() => <MovementsList loggedInUser={this.state.loggedInUser} />} />
          <Route path="/details/:id" render={props => <MovementDetails {...props} />} />
        </Switch>

      </>
      

    )
  }
}


export default App