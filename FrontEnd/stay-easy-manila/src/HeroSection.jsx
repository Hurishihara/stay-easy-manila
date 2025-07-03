import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick'
import {
    Box,
    Button,
    Text,
    Heading,
    Input,
    Grid,
    GridItem,
    Stack,
    useToast,
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
    DrawerFooter,
    Select,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import images from './images'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHotelStore } from './store/hotelStore.js';
import { useNavigate } from 'react-router-dom';
import { motion, isValidMotionProp } from 'framer-motion';


function HeroSection () {
    
    const { setHotel } = useHotelStore()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ hotelRating, setHotelRating ] = useState([])
    const [ preferredLocation, setPreferredLocation ] = useState(undefined)
    const [ hotelCharacteristics, setHotelCharacteristics ] = useState('')
    const [ hotelAmenities, setHotelAmenities ] = useState('')
    const [ additionalRequests, setAdditionalRequests ] = useState('')
    const navigate = useNavigate()
    const toast = useToast()

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const api = 'http://localhost:3000/api'
        
        const input = `${hotelCharacteristics} ${hotelAmenities} ${additionalRequests}`
        const response = axios.post(`${api}/recommendations`, { hotelRating, preferredLocation, input, })
        
       
        toast.promise(response, {
            loading: {
                title: 'Processing your request...',
                description: 'Please wait while we fetch the best recommendations for you.',
                status: 'info',
                duration: 5000,
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
                duration: 5000,
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
                duration: 5000,
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
            console.log(res.data)
            setTimeout(() => {
                navigate('/ph/recommendations')
            }, 2000)
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
                    h={{base: '90vh'}}
                    
                    >
                        <Grid
                        templateColumns='repeat(12, 1fr)'
                        p={{base: '2rem', lg: '3rem', xl: '5rem'}}
                        gap={{base: '2rem', lg: '3rem', xl: '5rem'}}
                        >
                            <GridItem colSpan={{base: 12, md: 8}} >
                                <Heading
                                fontFamily='homePageHeading'
                                fontSize={{base: '2rem', lg: '3rem', xl: '5rem'}}
                                color='whitesmoke'
                                fontWeight='bold'
                                lineHeight={{base: '2.5rem', lg: '3rem', xl: '5rem'}}
                                mt={{base: '14rem', md: '0'}}
                                >
                                    Find the Perfect Stay in Metro Manila with Ease!
                                </Heading>
                            </GridItem>
                            <GridItem colSpan={{base: 12, md: 7}}>
                                <Text
                                fontFamily='body'
                                fontSize={{base: '1rem', lg: '1.5rem', xl: '2rem'}}
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
                        <FormControl
                        >
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
                                    value='5.0'
                                    colorScheme='gray'
                                    >
                                        5 Star
                                    </Checkbox>
                                    <Checkbox 
                                    value='4.0'
                                    colorScheme='gray'
                                    >
                                        4 Star
                                    </Checkbox>
                                    <Checkbox 
                                    value='3.0'
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
                        <FormControl>
                            <FormLabel
                            fontWeight='bold'
                            fontFamily='drawerFontHeading'>
                                Select your preferred location:
                            </FormLabel>
                            <Select 
                            placeholder='Select Location'
                            value={preferredLocation}
                            onChange={(e) => setPreferredLocation(e.target.value)}
                            >
                                <option value='Makati City'>Makati</option>
                                <option value='Taguig City'>Taguig</option>
                                <option value='Pasay City'>Pasay</option>
                                <option value='Manila City'>Manila</option>
                                <option value='Quezon City'>Quezon City</option>
                                <option value='Paranaque'>Parañaque</option>
                                <option value='Muntinlupa City'>Muntinlupa</option>
                                <option value='Pasig City'>Pasig</option>
                                <option value='Las Pinas City'>Las Piñas</option>
                                <option value='Mandaluyong City'>Mandaluyong</option>
                            </Select>
                            <FormHelperText mb='2rem'>
                                Choose a location to find hotels that are near your preferred area.
                            </FormHelperText>
                        </FormControl>
                        <FormControl 
                        mt='1.5rem'
                        isRequired='true'
                        >
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
                                Provide descriptive characteristics that will refine 
                                your recommendations. For example: "Luxurious", "Elegant", "Sleek", "Cozy".
                            </FormHelperText>
                        </FormControl>
                        <FormControl 
                        mt='1.5rem'
                        isRequired='true'
                        >
                            <FormLabel
                            fontWeight='bold'
                            fontFamily='drawerFontHeading'
                            >
                                Type your preferred hotel facilities:
                            </FormLabel>
                            <Input 
                            borderRadius='2.75rem' 
                            minH='3rem' 
                            placeholder="e.g., Swimming Pool, Fitness Center, Free Wi-Fi"
                            value={hotelAmenities}
                            onChange={(e) => setHotelAmenities(e.target.value)} 
                            />
                            <FormHelperText mb='2rem'>
                                Provide more specific facilities for better suggestions. For example: "Conference Rooms", "Business Center", "On-site Dining".
                            </FormHelperText>
                        </FormControl>
                        <FormControl 
                        mt='1.5rem'
                        isRequired='true'
                        >
                            <FormLabel
                            fontWeight='bold'
                            fontFamily='drawerFontHeading'>
                                Anything else you would like to add?
                            </FormLabel>
                            <Input 
                            borderRadius='2.75rem' 
                            minH='3rem' 
                            placeholder="e.g., Non-smoking room, Quiet location, Parking"
                            value={additionalRequests}
                            onChange={(e) => setAdditionalRequests(e.target.value)} 
                            />
                            <FormHelperText mb='2rem'>
                                Specify anything else you might need or want in your hotel stay. 
                                This can include accessibility features, room amenities, 
                                or other special requests. For example: "Elevator Access", "Balcony", "Late Check-in / Check-out"
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
