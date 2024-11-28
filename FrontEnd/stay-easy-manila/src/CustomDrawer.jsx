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
                const destinationName = encodeURI(selectedHotel.hotel_name)

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
    waitForAnimate: true,
    cssEase: 'linear',
    arrows: false,
    dots: true,
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
            <DrawerContent overflowY='auto' bgColor='#EADBC8' >
                <DrawerCloseButton 
                color='fontColor'
                />
                <Heading color='fontColor' fontSize={{base: '1.7rem', md: '3rem'}} fontFamily='homePageHeading' fontWeight='bold' 
                mx={{base: '1.5rem', md: '3rem'}} 
                mt='3rem' 
                mb='1rem'>
                    {selectedHotel.hotel_name}
                </Heading>
                
                <Grid templateColumns='repeat(12, 1fr)' gap='3rem'>
                    <GridItem colSpan={{base: 12, md: 7}}>
                        <Box maxW={{base: '80%', md: '100%'}}>
                        <Slider {...settings}>
                                {Array.from({length: 5}).map((_, index) => (
                                    <AspectRatio ratio={15/10} key={index} borderRadius='1.5rem' overflow='hidden'>
                                    <Image src={`${api}${selectedHotel.image_folder_path}/image${index + 1}.jpg`}
                                    boxShadow='0px 4px 4px rgba(0, 0, 0, 0.50)'
                                    mx={{base: '0.5rem', md: '3rem'}}
                                    borderRadius='1.5rem'
                                    
                                     /> 
                                    </AspectRatio>
                                ))}
                        </Slider>
                        </Box>
                    </GridItem>
                    
                    <GridItem colSpan={{base: '12', md: '5'}}>
                        <Card 
                        maxW={{base: '79%', md: '100%'}}
                        bgColor='primary' 
                        align='center'
                        borderRadius='none' 
                        boxShadow='0px 4px 4px rgba(0, 0, 0, 0.50)'
                        textAlign={{base: 'center', md: 'justify'}}
                        p='1rem'
                        mx={{base: '0.5rem', md: '3rem'}}
                        >
                        <CardBody>
                            <Text 
                            color='fontColor' 
                            fontFamily='homePageHeading' 
                            fontSize={{base: '0.8rem', md: '1rem'}} 
                            fontWeight='regular' 
                             >
                                {selectedHotel.hotel_short_description}
                            </Text>
                                <Box 
                                display='flex' 
                                justifyContent='center' 
                                alignItems='center'
                                flexDirection={{base: 'column', md: 'row'}}
                                gap={{base: '1rem', md: '3rem'}}
                                mt={{base: '1rem', md: '2rem'}}
                                >
                                <Button
                                onClick={handleGetDirections}
                                minW='14rem'
                                minH='3.5rem'
                                bg='button'
                                color='primary'
                                borderRadius='3.75rem'
                                fontFamily='buttonFont'
                                fontWeight='semibold'
                                
                                
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
                         backgroundColor="rgba(0, 0, 0, 0.5)"
                         zIndex={1}
                         >
                            <Box position='absolute' top={{base: '10%', md: '20%'}} width={{base: '80%', md: '100%'}} textAlign='center' px='5rem'>
                                <Stack spacing={{base: '1.5rem', md: '3rem'}} direction='column'>
                                    <Heading 
                                    color='primary'
                                    fontSize={{base: '2rem', md: '4rem'}}
                                    fontWeight='bold'
                                    fontFamily='homePageHeading'
                                    letterSpacing='0.05rem'>
                                        REVIEWS
                                    </Heading>
                                    <Slider {...settings2}>
                                        {selectedHotel.reviews.map((review) => (
                                            <Text color='primary'
                                            fontFamily='reviewFont'
                                            as='i'
                                            fontSize={{base: '0.9rem', md: '1.3rem'}}
                                            fontWeight='regular'
                                            letterSpacing={{base: '0', md: '0.02rem'}}
                                            
                                            >
                                                {review}
                                            </Text>
                                        ))}
                                    </Slider>
                                </Stack>
                            </Box>
                         </Box>
                    </GridItem>  
                    {selectedHotel.amenities.length > 0 && (
                        <>
                        <GridItem colSpan={{base: 12, md: 5}} m={{base: '0.5rem', md: '3rem'}}>
                            <Box w={{base: '80%', md: '100%'}}>
                                <Text 
                                fontFamily='title' 
                                fontSize={{base: '0.8rem', md: '1rem'}} 
                                color='fontColor'
                                ml={{base: '1.3rem', md: '0'}}>
                                    StayEasyManila
                                </Text>
                                <Heading
                                color='fontColor'
                                fontSize={{base: '2.5rem', md: '3rem'}}
                                fontWeight='bold'
                                fontFamily='homePageHeading'
                                textAlign={{base: 'center', md: 'left'}}
                                mb={{base: '1.5rem', md: '3rem'}}
                                >
                                    Discover Comfort, Convenience, and Luxury
                                </Heading>
                                <Text
                                fontSize={{base: '1rem', md: '1.3rem'}}
                                color='fontColor'
                                fontFamily='homePageHeading'
                                textAlign={{base: 'center', md: 'justify'}}
                                >
                                    From luxurious comforts to thoughtful conveniences, every amenity is designed to elevate your stay. 
                                    Discover everything you need for relaxation, entertainment, 
                                    and an unforgettable experience.
                                </Text>
                            </Box>
                        </GridItem>
                        <GridItem colSpan={{base: 12, md: 7}} 
                        mt={{base: '0', md: '5rem'}} 
                        mb={{base: '1.5rem', md: '5rem'}}
                        mx={{base: '1.5rem', md: '3rem'}}>
                            <SimpleGrid columns={{base: 1, md: 3}} spacing={{base: '1.5rem', md: '3rem'}}>
                                {selectedHotel.amenities.map((amenity) => (
                                    <Box w={{base: '80%', md: '100%'}} >
                                        <List>
                                            <ListItem fontSize='1.5rem' fontFamily='homePageHeading' fontWeight='bold' color='fontColor' >
                                                <ListIcon as={FaCheckCircle} color='fontColor' />
                                                {amenity}
                                            </ListItem>
                                        </List>
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </GridItem>
                        </>
                    )}   
                </Grid>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default CustomDrawer
