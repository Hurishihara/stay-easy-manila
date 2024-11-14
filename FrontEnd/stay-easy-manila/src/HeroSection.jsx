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
    useToast
} from '@chakra-ui/react'
import images from './images'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useClickStore } from './store/clickStore.js';
import { useHotelStore } from './store/hotelStore.js';
import { useNavigate } from 'react-router-dom';



function HeroSection () {
    
    // Store for the click state
    const { isClicked, setIsClicked } = useClickStore()
    const { setHotel } = useHotelStore()
    const [input, setInput] = useState('')
    const navigate = useNavigate()
    const toast = useToast()
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const api = 'http://localhost:3000/api'
        
       
        const response = axios.post(`${api}/recommendations`, {input})
       
        toast.promise(response, {
            loading: {
                title: 'Processing your request...',
                description: 'Please wait while we fetch the best recommendations for you.',
                status: 'info',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right',
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
                position: 'bottom-right',
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
                position: 'bottom-right',
                containerStyle: {
                    fontSize: '1.25rem',
                    fontFamily: 'body',
                }
                
            })
            
        })
        response.then((res) => {
            setHotel(res.data.data)
            setTimeout(() => {
                navigate('/recommendations')
            }, 3000)
        }).catch((err) => {
            console.error(err)
        })

                

    }

        // Settings for the slider
        const settings = {
            arrows: false,
            fade: true,
            infinite: true,
            speed: 500,
            waitForAnimate: false,
            autoplay: true,
            autoplaySpeed: 3000,
            cssEase: 'linear',
        }
    
        // Function to render the input or the buttons
        const renderInputOrButtons = () => {
            if(isClicked) {
                return (
                    <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder= 'What kind of hotel are you looking for?'
                    bg='button'
                    mt='2.8125rem'
                    mb={{base: 'none', md: '2.5rem'}}
                    pl={{base: 'none', md: '2.8125rem'}}
                    minW={{base: '21.5625rem', md: '44.0625rem'}}
                    minH={{base: '4.8125rem', md: '6.4375rem'}}
                    borderRadius='3.125rem'
                    fontSize={{base: '1.15rem', md: '1.875rem'}}
                    fontFamily='regular'
                    letterSpacing={{base: '0.03rem', md: '0.05rem'}}
                    color='primary'
                    textAlign={{base: 'center', md: 'left'}}
                    _placeholder={{
                        color: 'primary',
                        opacity: '50%'
                    }}
                    />
                );
            }
            else {
                return (
                    <Stack
                    variant='unstyled'
                    direction={{base: 'column', md: 'row'}}
                    mt='2.8125rem'
                    mb={{base: 'none', md: '2.5rem'}}
                    spacing={{base: '1rem', md: '3.125rem'}}
                    >
                        <Button
                        bgColor='button'
                        color='primary'
                        minW={{base: '100%', md: '18.75rem'}}
                        minH='4.375rem'
                        borderRadius='3.75rem'
                        fontSize='1.25rem'
                        letterSpacing='1.5px'
                        fontFamily='heading'
                        fontWeight='semibold'
                        onClick={() => setIsClicked(true)}>
                            GET STARTED
                        </Button>
                        <Button
                        bgColor='rgba(228, 249, 255, 0.7)'
                        color='white'
                        minW={{base: '100%', md: '18.75rem'}}
                        minH='4.375rem'
                        borderRadius='3.75rem'
                        fontSize='1.25rem'
                        letterSpacing='1.5px'
                        fontFamily='heading'
                        fontWeight='semibold'>
                            LEARN MORE
                        </Button>
                    </Stack>
                )
            }
        }

    return (
        <>
            <Grid 
            templateColumns={{base: '1fr', md: 'repeat(12, 1fr)'}} 
            gap={{base: '2rem', md: '5rem'}} 
            pl={{base: '2rem', md: '11.75rem'}} 
            pr={{base: '2rem', md: '11.75rem'}} 
            pt={{base: '3.75rem', md: '6.34375rem'}}
            >
                <GridItem colSpan={{base: 12, md: 6}} >
                    <Box>
                        <Heading
                        fontFamily='heading'
                        fontSize={{base: '3rem', md: '2rem', lg: '6rem'}}
                        fontWeight='bold'
                        textAlign={{base: 'left', md: 'left'}}
                        >

                             Find The Perfect Stay In  Metro Manila  With Ease!
                        </Heading>
                    </Box>
                    <Box pt={{base: '1.40625rem', md: '2.8125rem'}}>
                        <Text
                        fontFamily='body'
                        fontSize={{base: '1.5625rem', md: '1.875rem'}}
                        fontWeight='regular'
                        textAlign={{base: 'left', md: 'left'}}
                        >
                            StayEasyManila is a comprehensive hotel
                            recommendation system that lets you discover the
                            best hotel stay in Metro Manila, tailored to your
                            preferences.
                        </Text>
                    </Box>
                    <form
                        action='/recommendations'
                        method='post'
                        onSubmit={handleSubmit}
                        >
                        {renderInputOrButtons()}
                    </form>
                </GridItem>
                <GridItem
                colSpan={{base: 12, md: 6}}
                >
                    <Box>
                        <Slider {...settings}>
                            {images.map((src, index) => (
                                <Image 
                                borderRadius='3.75rem' 
                                key={index} src={src} 
                                alt={`hotel-image${index}` } 
                                alignContent={{base: 'left', md: 'left'}}
                                />
                            ))}
                        </Slider>
                    </Box>
                </GridItem>
            </Grid>
        </>
    )
}

export default HeroSection;
