import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import BookingScreen from './screens/BookingScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import AdminScreen from './screens/AdminScreen'
import LandingScreen from './screens/LandingScreen'
import PaymentScreen from './screens/PaymentScreen'
import ContactScreen from './screens/ContactScreen'
import PolicyScreen from './screens/PolicyScreen'

function App () {

  return (
    <div className='App'>
    
      <Navbar/>
      <BrowserRouter>

        <Route path="/home" exact component={HomeScreen} />
        <Route path="/register" exact component={RegisterScreen} />
        <Route path="/login" exact component={LoginScreen} />
        <Route path='/book/:excursionid/:thedate' exact component={BookingScreen} />
        <Route path='/profile' exact component={ProfileScreen} />
        <Route path='/admin' exact component={AdminScreen} />
        <Route path='/' exact component={LandingScreen} />
        <Route path='/payment-options' component={PaymentScreen} />
        <Route path='/contact-us' component={ContactScreen} />
        <Route path='/terms&policy' component={PolicyScreen} />

      </BrowserRouter>   
      
    </div>
  
  )
}

export default App
