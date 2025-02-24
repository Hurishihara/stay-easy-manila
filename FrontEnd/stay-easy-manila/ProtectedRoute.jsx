import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useHotelStore } from './src/store/hotelStore'

const ProtectedRoute = () => {
 
  

  return <Outlet />
  
}

export default ProtectedRoute
