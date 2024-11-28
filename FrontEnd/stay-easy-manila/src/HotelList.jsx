import React, { useEffect, useState } from 'react'
import NavBar from './Navbar.jsx'
import { Box, Flex, Heading, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { useHotelStore } from './store/hotelStore.js'
import { FaStar } from "react-icons/fa";
import CustomCard from './CustomCard.jsx'
import CustomDrawer from './CustomDrawer.jsx'
import { useNavigate } from 'react-router-dom'
import src from './assets/recommendationsBG.png'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
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
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            dots: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        }
      ]
      
    }


  return (
    <>
      <Box 
        bg='primary' 
        color='fontColor'
        backgroundImage={`url(${src})`}
        backgroundSize='cover'
        backgroundPosition='center'
        h='100vh'
        overflow='hidden'
        >

        <NavBar />
        <Box mt='3rem'>
          <Box 
          display='flex' 
          flexDirection='column' 
          justifyContent='center' 
          alignItems='center' 
          h='100%'>
            <Heading 
            color='fontColor' 
            fontFamily='homePageHeading' 
            fontSize={{base: '2rem', md: '4rem'}} 
            mb='1rem'>
              Find Your Perfect Stay
            </Heading>
            <Text 
            color='fontColor' 
            fontFamily='homePageHeading' 
            fontSize={{base: '1rem', md: '1.5rem'}} 
            px={{base: '1.5rem', md: '0'}} 
            textAlign='justify' 
            as='i'>
              Choose from our expertly recommended hotels, tailored to match your preferences and
              elevate your travel experiences. 
            </Text>
          </Box>
        <Box px='1rem' my='3rem'>
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
        </Box>
      {selectedHotel && <CustomDrawer 
      isOpen={isOpen} 
      onClose={onClose} 
      selectedHotel={selectedHotel} />}
      </Box>
    </Box>
    </>
  )
}

export default HotelList
