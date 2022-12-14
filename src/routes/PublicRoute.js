import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useAuth from '../auth/useAuth'

import NavBar from '../components/NavBar'
import ClientPage from '../pages/ClientPage'
import DebtConceptPage from '../pages/DebtConceptPage'
import { DebtPage } from '../pages/DebtPage'
import HistoryPage from '../pages/HistoryPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import Page404 from '../pages/Page404'
import PaymentPage from '../pages/PaymentPage'
import RegisterPage from '../pages/RegisterPage'
import PrivateRoute from './PrivateRoute'

const PublicRoute = () => {
  const UseAuth = useAuth();
  return (
    <>
    <BrowserRouter>
    <NavBar state={ UseAuth.isLogged() }/>
        <Routes>
            <Route path='/' element= { <PrivateRoute state={ UseAuth.isLogged() }> <HomePage/> </PrivateRoute> } />
            <Route path='/client' element= { <PrivateRoute state={ UseAuth.isLogged() }> <ClientPage/> </PrivateRoute> } />
            <Route path='/payment' element={ <PrivateRoute state={UseAuth.isLogged() }> <DebtPage/> </PrivateRoute>} />
            <Route path='/debtconcept' element={ <PrivateRoute state={UseAuth.isLogged() }> <DebtConceptPage/> </PrivateRoute>} />
            <Route path='/debt' element={ <PrivateRoute state={UseAuth.isLogged() }> <PaymentPage/> </PrivateRoute>} />
            <Route path='/history' element={ <PrivateRoute state={UseAuth.isLogged() }> <HistoryPage/> </PrivateRoute>} />
            <Route path='/login' element= { <LoginPage/> } />
            <Route path='/register' element= { <RegisterPage/> } />
            <Route path='*' element= { <Page404/> } />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default PublicRoute