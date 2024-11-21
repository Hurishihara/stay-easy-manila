import { 
    Box, 
    Drawer, 
    DrawerCloseButton, 
    DrawerContent, 
    DrawerHeader, 
    DrawerOverlay, 
    Grid,
    GridItem, 
    Heading, 
    Image, 
    ListItem, 
    OrderedList, 
    Text, 
    Stack,
    Card,
    CardBody,
    Flex,
    Divider,
    List,
    ListIcon,
    SimpleGrid,
    Button,
    VStack,
    AspectRatio,
    DrawerBody,
    CardFooter
} from '@chakra-ui/react'
import React from 'react'
import Slider from 'react-slick'
import { FaCheckCircle } from "react-icons/fa";
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'
import src from './assets/hotelDetailsBG.png'
import { css } from '@emotion/react';


const CustomDrawer = ({isOpen, onClose, selectedHotel}) => {
  

    const api = 'http://localhost:3000'
    

    const handleGetDirections = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                const destinationName = encodeURIComponent(selectedHotel.hotel_name)

                const googleUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destinationName}`
                window.open(googleUrl, '_blank')
            }, (error) => {
                console.error('Error getting location', error)
                alert('Unable to retrieve your location. Please allow location access.')
            })
        }
        else {
            console.error('Geolocation is not supported by this browser')
        }
    }

    const handleVisitWebsite = () => {
        window.open(selectedHotel.website_link, '_blank')
    }
  
    console.log(`${api}${encodeURI(selectedHotel.image_folder_path)}/image3.jpg`)

  // Settings for the slider
  const settings = {
    fade: true,
    infinite: true,
    speed: 500,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    arrows: false,
}

    const settings2 = {
        arrows: false,
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        waitForAnimate: false,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
    }
  
    return (
    <>
        <Drawer 
        isOpen={isOpen} 
        onClose={onClose} 
        size='full' 
        placement='top'
        >
            <DrawerOverlay/>
            <DrawerContent overflow='auto' bgColor='#EADBC8'>
                <DrawerCloseButton 
                color='fontColor'
                />
                <Heading color='fontColor' fontFamily='homePageHeading' fontWeight='bold' mx='3rem' my='3rem'>
                    {selectedHotel.hotel_name}
                </Heading>
                
                <Grid templateColumns='repeat(12, 1fr)' gap='3rem'>
                    <GridItem colSpan='7'>
                        <AspectRatio ratio={15/10} >
                        <Image src={`${api}${selectedHotel.image_folder_path}/image1.jpg`}
                        borderRadius='1.5rem'
                        boxShadow='0px 4px 4px rgba(0, 0, 0, 0.50)'
                        mx='3rem' />
                        </AspectRatio>
                    </GridItem>
                    
                    <GridItem colSpan='5'>
                        <Card 
                        maxW='2xl'
                        bgColor='primary' 
                        align='center' 
                        borderRadius='none' p='2rem' 
                        boxShadow='0px 4px 4px rgba(0, 0, 0, 0.50)'
                        mx='3rem'
                        >
                        <CardBody textAlign='justify'>
                            <Text color='fontColor' fontFamily='homePageHeading' fontSize='1rem' fontWeight='regular'>
                                {selectedHotel.hotel_short_description}
                            </Text>
                                <Box display='flex' justifyContent='center' alignItems='center'>
                                <Button
                                onClick={handleGetDirections}
                                minW='14rem'
                                minH='3.5rem'
                                bg='button'
                                color='primary'
                                borderRadius='3.75rem'
                                fontFamily='buttonFont'
                                fontWeight='semibold'
                                mt='2rem'
                                mx='1rem'
                                
                                >
                                    GET DIRECTIONS
                                </Button>
                                <Button
                                onClick={handleVisitWebsite}
                                minW='14rem'
                                minH='3.5rem'
                                bg='button'
                                color='primary'
                                borderRadius='3.75rem'
                                fontFamily='buttonFont'
                                fontWeight='semibold'
                                mt='2rem'
                                mx='1rem'
                                >
                                    VISIT WEBSITE
                                </Button>
                                </Box>
                        </CardBody>
                    </Card> 
                    </GridItem>
                    <GridItem 
                    colSpan='12' 
                    bgImage={`url(${api}${encodeURI(selectedHotel.image_folder_path)}/image3.jpg)`} 
                    bgPosition='center'
                    bgRepeat='no-repeat'
                    h='100vh' 
                    backgroundSize='cover'
                    position='relative'
                    >
                         <Box position='absolute'
                         top='0'
                         left='0'
                         right='0'
                         bottom='0'
                         backgroundColor="rgba(0, 0, 0, 0.3)"
                         zIndex={1}
                         />
                         
                        <Stack direction='column' position='relative' zIndex={1} gap='3rem' mt='10rem'>
                            <Heading 
                            color='primary' 
                            alignContent='center'
                            justifyContent='center'
                            align='center'
                            fontSize='3rem'
                            fontWeight='bold'
                            fontFamily='homePageHeading'
                            letterSpacing='0.09rem'
                            >
                                Reviews
                            </Heading>
                            
                            <Slider {...settings2}>
                            {selectedHotel.reviews.map((review) => (
                                <Box maxWidth="50%" ml='27rem' overflow='hidden' >
                                    <Text 
                                    color='primary' 
                                    fontFamily='reviewFont'
                                    as='i'
                                    fontSize='1.5rem'
                                    fontWeight='regular'
                                    letterSpacing='0.02rem'
                                    textAlign='center'
                                    >
                                    {review}
                                    </Text>
                                </Box>
                            ))}
                            </Slider>
                        </Stack>
                    </GridItem>           
                </Grid>
                
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default CustomDrawer
