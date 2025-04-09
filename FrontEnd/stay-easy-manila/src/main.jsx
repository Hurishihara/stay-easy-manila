import '@fontsource/atma'
import '@fontsource/amaranth'
import '@fontsource-variable/outfit'
import '@fontsource/poppins'
import '@fontsource-variable/roboto-mono'
import '@fontsource-variable/montserrat';
import '@fontsource-variable/open-sans'
import '@fontsource-variable/lora';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HotelList from './HotelList.jsx'
import ProtectedRoute from '../ProtectedRoute.jsx'

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {element: <ProtectedRoute /> , children: [{ path: '/ph/recommendations', element: <HotelList /> }]},
], {
  basename: '/stay-easy-manila/' // Set the base URL for the app,
})

console.log(import.meta.env.VITE_BASE_URL)

const theme = extendTheme({
  colors: {
    primary: '#FEFAF6',
    fontColor: '#181C14',
    button: '#102C57',
    buttonColor: {
      50: '#e5f9ff', // Lightest shade
      100: '#bbedfb',
      200: '#90e1f9',
      300: '#69d5f8',
      400: '#50caf6',
      500: '#43b0dd', // Base color
      600: '#3489ab',
      700: '#25627a',
      800: '#123a49',
      900: '#00141a', // Darkest shade
    },
  },
  
  fonts: {
    title: "'Poppins', sans-serif",
    heading: "'Amaranth', sans-serif",
    homePageHeading: "'Montserrat Variable', sans-serif",
    drawerFontHeading: "'Open Sans Variable', sans-serif",
    buttonFont: "'Roboto Mono Variable', monospace",
    body: "'Outfit', sans-serif",
    reviewFont: "'Lora Variable', serif",

  },
  
  fontWeights: {
    poppins: {
      thin: 100,
      extraLight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      black: 900
    },
    amaranth: {
      regular: 400,
      bold: 700
    },
    outfit: {
      thin: 100,
      extraLight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      black: 900
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
