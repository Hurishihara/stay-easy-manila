import React, { useEffect, useState } from 'react'
import NavBar from './Navbar.jsx'
import { Box, Flex, Heading, Stack, useDisclosure } from '@chakra-ui/react'
import { useHotelStore } from './store/hotelStore.js'
import { FaStar } from "react-icons/fa";
import CustomCard from './CustomCard.jsx'
import CustomDrawer from './CustomDrawer.jsx'
import { useNavigate } from 'react-router-dom'
import src from './assets/recommendationsBG.png'
import Slider from 'react-slick'
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'

const HotelList = () => {
  
  const navigate = useNavigate()
  const { hotel } = useHotelStore()
 


  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedHotel, setSelectedHotel] = useState(null)

  const openDrawer = (hotelData) => {
      setSelectedHotel(hotelData)
      onOpen();
    }

  

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      nextArrow: <ArrowForwardIcon />,
      prevArrow: <ArrowBackIcon />,
    }


  return (
    <>
      <Box 
        bg='primary' 
        color='white'
        backgroundImage={`url(${src})`}
        backgroundSize='cover'
        h='100vh'
        >

        <NavBar />
        
        <Slider {...settings}>
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
        </Slider>
        
      {selectedHotel && <CustomDrawer 
      isOpen={isOpen} 
      onClose={onClose} 
      selectedHotel={selectedHotel} />}
    </Box>
    </>
  )
}

export default HotelList
