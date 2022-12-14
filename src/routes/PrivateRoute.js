import React from 'react'
import { Navigate } from 'react-router-dom'
const PrivateRoute = ({children, state}) => {
if(state)
  return (
    children
  )
  else
  return (
    <Navigate to='/login' />
  ) 
}

export default PrivateRoute