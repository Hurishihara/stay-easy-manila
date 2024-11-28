import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick'
import {
    Box,
    Button,
    Text,
    Heading,
    Image,
    ButtonGroup,
    Input,
    Spinner,
    Flex,
    Grid,
    GridItem,
    Stack,
    useToast,
    chakra,
    AspectRatio,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    CheckboxGroup,
    Checkbox,
    FormControl,
    FormLabel,
    FormHelperText,
    DrawerFooter
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import images from './images'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useClickStore } from './store/clickStore.js';
import { useHotelStore } from './store/hotelStore.js';
import { useNavigate } from 'react-router-dom';
import { motion, isValidMotionProp } from 'framer-motion';


function HeroSection () {
    
    // Store for the click state
    const { isClicked, setIsClicked } = useClickStore()
    const { setHotel } = useHotelStore()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [hotelRating, setHotelRating] = useState([])
    const [hotelCharacteristics, setHotelCharacteristics] = useState('')
    const [hotelAmenities, setHotelAmenities] = useState('')
    const [additionalRequests, setAdditionalRequests] = useState('')
    const navigate = useNavigate()
    const toast = useToast()
    

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const api = 'http://localhost:3000/api'
        
        const input = `${hotelCharacteristics} ${hotelAmenities} ${additionalRequests}`
        const response = axios.post(`${api}/recommendations`, { hotelRating, input })
        
       
        toast.promise(response, {
            loading: {
                title: 'Processing your request...',
                description: 'Please wait while we fetch the best recommendations for you.',
                status: 'info',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left',
                containerStyle: {
                    fontSize: '1.25rem',
                    fontFamily: 'body',
                }
            },
            success: {
                title: 'Recommendations fetched successfully',
                description: 'You will be redirected to the recommendations page...',
                status: 'success',
                duration: 3000,
                position: 'bottom-left',
                isClosable: true,
                containerStyle: {
                    fontSize: '1.25rem',
                    fontFamily: 'body',
                }
            },
            error: (err) => ({
                title: 'Error processing request',
                description: err.response.data,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-left',
                containerStyle: {
                    fontSize: '1.25rem',
                    fontFamily: 'body',
                }
                
            })
            
        })
        response.then((res) => {
            setHotel(res.data.data)
            setTimeout(() => {
                navigate('/ph/recommendations')
            }, 3000)
        }).catch((err) => {
            console.error(err)
        })
    }

    const handleDrawerClick = () => {
        onOpen()
    }

        // Settings for the slider
        const settings = {
            arrows: false,
            fade: true,
            infinite: true,
            speed: 500,
            waitForAnimate: false,
            autoplay: true,
            autoplaySpeed: 2500,
            cssEase: 'linear',
        }
    
        

    return (
        <>
        
            <Slider {...settings}>
                {images.map((src, index) => (
                   <Box p={{base: '1rem', md: '2rem'}} >
                    <Box 
                    key={index}
                    backgroundImage={`url(${src})`}
                    backgroundSize='cover'
                    backgroundPosition='center'
                    borderRadius='1.75rem'
                    h={{base: '90vh', md: '90vh'}}
                    
                    >
                        <Grid
                        templateColumns='repeat(12, 1fr)'
                        p={{base: '2rem', md: '5rem'}}
                        gap={{base: '2rem', md: '5rem'}}
                        >
                            <GridItem colSpan={{base: 12, md: 8}} >
                                <Heading
                                fontFamily='homePageHeading'
                                fontSize={{base: '2rem', md: '5rem'}}
                                color='whitesmoke'
                                fontWeight='bold'
                                lineHeight={{base: '2.5rem', md: '5rem'}}
                                mt={{base: '14rem', md: '0'}}
                                >
                                    Find the Perfect Stay in Metro Manila with Ease!
                                </Heading>
                            </GridItem>
                            <GridItem colSpan={{base: 12, md: 7}}>
                                <Text
                                fontFamily='body'
                                fontSize={{base: '1rem', md: '1.5rem'}}
                                as='i'
                                color='whitesmoke'
                                >
                                StayEasyManila is a comprehensive hotel
                                recommendation system that lets you discover the
                                best hotel stay in Metro Manila, tailored to your
                                preferences.
                                </Text>
                            </GridItem>
                            <GridItem colSpan={{base: 12, md: 7}}>
                                <Button
                                bgColor='button'
                                color='primary'
                                minW={{base: '13rem', md: '18.75rem'}}
                                minH={{base: '3rem', md: '4.375rem'}}
                                borderRadius='3.75rem'
                                fontSize={{base: '1rem', md: '1.35rem'}}
                                fontFamily='buttonFont'
                                fontWeight='semibold'
                                rightIcon={<ArrowForwardIcon />}
                                onClick={handleDrawerClick}>
                                    GET STARTED
                                </Button>
                            </GridItem>
                        </Grid>
                    </Box>
                    
                    
                    </Box>
                ))}
            </Slider>
            <Drawer 
            isOpen={isOpen} 
            onClose={onClose} 
            size='sm'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px' fontSize='1.5rem' fontFamily='drawerFontHeading' fontWeight='bold'>
                        Hotel Preferences
                    </DrawerHeader>
                    <DrawerBody>
                        <form id='hotel-form' onSubmit={handleSubmit} method='post'  >
                        <FormControl>
                            <FormLabel
                            fontWeight='bold'
                            fontFamily='drawerFontHeading'
                            >
                                Select your desired hotel rating:
                            </FormLabel>
                            <CheckboxGroup value={hotelRating}
                            onChange={(value) => setHotelRating(value)}>
                                <Stack 
                                spacing='1.5rem' 
                                direction='row'
                                >
                                    <Checkbox 
                                    value='5'
                                    colorScheme='gray'
                                    >
                                        5 Star
                                    </Checkbox>
                                    <Checkbox 
                                    value='4'
                                    colorScheme='gray'
                                    >
                                        4 Star
                                    </Checkbox>
                                    <Checkbox 
                                    value='3'
                                    colorScheme='gray'
                                    >
                                        3 Star
                                    </Checkbox>
                                </Stack>
                            </CheckboxGroup>
                            <FormHelperText mb='2rem'>
                                Select one or more ratings to find hotels that meet your preferences.
                            </FormHelperText>
                        </FormControl>
                        <FormControl 
                        mt='1.5rem'>
                            <FormLabel
                            fontWeight='bold'
                            fontFamily='drawerFontHeading'>
                                Type your preferred hotel characteristics:
                            </FormLabel>
                            <Input 
                            borderRadius='2.75rem' 
                            minH='3rem' 
                            placeholder="e.g., Luxury, Modern, Contemporary" 
                            value={hotelCharacteristics}
                            onChange={(e) => setHotelCharacteristics(e.target.value)}
                            />
                            <FormHelperText mb='2rem'>
                                Enter characteristics that will refine your recommendations. For example: "Pet-friendly", "Eco-friendly", "Romantic getaway".
                            </FormHelperText>
                        </FormControl>
                        <FormControl 
                        mt='1.5rem'
                        >
                            <FormLabel
                            fontWeight='bold'
                            fontFamily='drawerFontHeading'>
                                Type your preferred hotel amenities:
                            </FormLabel>
                            <Input 
                            borderRadius='2.75rem' 
                            minH='3rem' 
                            placeholder="e.g., Pool, Gym, Free Wi-Fi"
                            value={hotelAmenities}
                            onChange={(e) => setHotelAmenities(e.target.value)} 
                            />
                            <FormHelperText mb='2rem'>
                                Provide more specific amenities for better suggestions. For example: "Spa", "Business center", "Pet-friendly".
                            </FormHelperText>
                        </FormControl>
                        <FormControl 
                        mt='1.5rem'
                        >
                            <FormLabel
                            fontWeight='bold'
                            fontFamily='drawerFontHeading'>
                                Anything else you would like to add?
                            </FormLabel>
                            <Input 
                            borderRadius='2.75rem' 
                            minH='3rem' 
                            placeholder="e.g., Non-smoking room, Quiet location, Near Mall"
                            value={additionalRequests}
                            onChange={(e) => setAdditionalRequests(e.target.value)} 
                            />
                            <FormHelperText mb='2rem'>
                                Specify anything else you might need or want in your hotel stay. This can include location preferences, room specifics, or other requests.
                            </FormHelperText>
                        </FormControl>
                        </form>
                    </DrawerBody>
                    <DrawerFooter borderTopWidth='1px'>
                        <Button type='submit' form='hotel-form' bgColor='button' color='primary' fontFamily='buttonFont' >
                            Submit
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default HeroSection;
