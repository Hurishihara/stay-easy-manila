import React, { useEffect, useState } from 'react'
import NavBar from './Navbar.jsx'
import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import { useHotelStore } from './store/hotelStore.js'
import Slider from 'react-slick'
import { FaStar } from "react-icons/fa";
import CustomCard from './CustomCard.jsx'
import CustomDrawer from './CustomDrawer.jsx'
import { useNavigate } from 'react-router-dom'

const HotelList = () => {
  
  const navigate = useNavigate()
  const { hotel } = useHotelStore()
 


  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedHotel, setSelectedHotel] = useState(null)

  const openDrawer = (hotelData) => {
      setSelectedHotel(hotelData)
      onOpen();
    }

  


  return (
    <>
      <Box 
        bg='primary' 
        color='white' 
        pl={{base: '2rem', md: 'none'}} 
        pr={{base: '2rem', md: 'none'}} >
        <NavBar />
        <Flex 
        flexDirection={{base: 'column', md: 'row'}} 
        flexWrap='wrap' 
        justifyContent='space-evenly' >
          <CustomCard 
          hotelName={hotel[0].hotel_name}
          result='Top Result'
          description={hotel[0].hotel_short_description}
          starRating={hotel[0].stars}
          hotelType={hotel[0].stars}
          imagePath={hotel[0].image_folder_path}
          onClick={() => openDrawer(hotel[0])} 
          />
          {hotel[1].map((item) => (
          <CustomCard
          hotelName={item.hotel_name}
          result='Similar Results'
          description={item.hotel_short_description}
          starRating={item.stars}
          hotelType={item.stars}
          imagePath={item.image_folder_path}
          onClick={() => openDrawer(item)} 
          />
        ))}
        </Flex>
      {selectedHotel && <CustomDrawer 
      isOpen={isOpen} 
      onClose={onClose} 
      selectedHotel={selectedHotel} />}
    </Box>
    </>
  )
}

export default HotelList
