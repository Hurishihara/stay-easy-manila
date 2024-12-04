import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useHotelStore } from './src/store/hotelStore'

const ProtectedRoute = () => {
  const hotels = useHotelStore(state => state.hotel)
  
  if(!hotels || hotels.length === 0) {
    return <Navigate to='/' replace/>
  }
  return <Outlet />
  
}

export default ProtectedRoute
