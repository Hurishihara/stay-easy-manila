import React from 'react';
import { Box } from '@chakra-ui/react'
import NavBar from './Navbar.jsx';
import HeroSection from './HeroSection.jsx';

function App () {

  return (
    <Box bgColor='primary' color='white' minH='100vh'>
      <NavBar />
      <HeroSection />
    </Box>
  )
}

export default App
