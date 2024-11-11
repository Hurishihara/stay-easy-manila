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
    AspectRatio
} from '@chakra-ui/react'
import React from 'react'
import Slider from 'react-slick'
import { FaCheckCircle } from "react-icons/fa";



const CustomDrawer = ({isOpen, onClose, selectedHotel}) => {
  

    const api = 'http://localhost:5000'

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

    const settings2 = {
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,      
        fade: true,
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
            <DrawerContent bgColor='primary' overflow='auto'>
                <Grid
                templateColumns={{base: '1fr', md: 'repeat(12, 1fr)'}}
                pl={{base: '2rem', md: '5rem'}}
                pr={{base: '2rem', md: '5rem'}}
                pt={{base: '2rem', md: '5rem'}}
                pb={{base: '2rem', md: '5rem'}}
                >
                    <GridItem 
                    colSpan={{base: '12', md: '5'}}
                    >
                        <Slider 
                        {...settings}>
                            {Array.from({length: 5}).map((_, index) => (
                                <AspectRatio 
                                ratio={4 / 3} 
                                key={index}
                                >
                                    <Image 
                                    src={`${api}${selectedHotel.image_folder_path}/image${index + 1}.jpg`}
                                    borderRadius='1em'
                                    />
                                </AspectRatio>
                            ))}
                        </Slider>
                    </GridItem>
                    <GridItem 
                    colSpan={{base: '12', md: '7'}}
                    ml={{base: '0', md: '2rem'}}>
                        <Box 
                        pb={{base: '2rem', md: '3rem'}} 
                        mt={{base: '2rem', md: '0'}}
                        display={{base: 'flex', md: 'block'}}
                        justifyContent={{base: 'center', md: 'flex-start'}}
                        alignContent={{base: 'center', md: 'flex-start'}}
                        >
                            <Heading 
                            fontSize={{base: '2rem', md: '3rem'}} 
                            fontFamily='heading' 
                            letterSpacing='0.08rem' 
                            color='whitesmoke'
                            >
                                {selectedHotel.hotel_name}
                            </Heading>
                        </Box>
                        <Box mb={{base: '3rem', md: '0'}}>
                            <Text 
                            fontSize={{base: '1.20rem', md: '1.5rem'}} 
                            fontFamily='body' 
                            fontWeight='regular' 
                            letterSpacing='0.02rem' 
                            color='whitesmoke'
                            >
                                {selectedHotel.hotel_short_description}
                            </Text>
                        </Box>
                        {selectedHotel.amenities.length === 0 && (
                            <Stack 
                            direction={{base: 'column', md: 'row'}} 
                            spacing={{base: '1rem', md: '3rem'}} 
                            pt={{base: '0', md: '2rem'}}
                            pb={{base: '2rem', md: '0'}}>
                            <Button
                            onClick={handleGetDirections}
                            minW={{base: '100%', md: '16.28125rem'}} 
                            minH='4.375rem'
                            bg='button'
                            color='primary' 
                            borderRadius='3.75rem'
                            letterSpacing='0.09375rem'
                            fontFamily='heading'
                            fontWeight='semibold'>
                                GET DIRECTIONS
                            </Button>
                            <Button
                            onClick={handleVisitWebsite}
                            minW={{base: '100%', md: '16.28125rem'}} 
                            minH='4.375rem' 
                            borderRadius='3.75rem'
                            letterSpacing='0.09375rem'
                            fontFamily='heading'
                            fontWeight='semibold'
                            bgColor='rgba(228, 249, 255, 0.7)'
                            color='white'>
                                VISIT WEBSITE
                            </Button>
                            </Stack>
                        )}
                               
                    </GridItem>                    
                    <GridItem 
                    colSpan={{base: '12', md: selectedHotel.amenities.length > 0 ? '5' : '12'}} 
                    pb='4rem'
                    >
                        <Flex 
                        justifyContent='center' 
                        alignItems='center' 
                        pb='2rem'
                        >
                            <Heading 
                            fontSize={{base: '2rem', md: '2.5rem'}} 
                            fontFamily='heading' 
                            fontWeight='bold' 
                            letterSpacing='0.08rem' 
                            color='whitesmoke' 
                            opacity={0.7}
                            >
                                Reviews
                            </Heading>
                        </Flex>
                        <OrderedList>
                            <Slider 
                            {...settings2}
                            >
                            {selectedHotel.reviews.map((review, index) => (
                                <ListItem 
                                key={index}>
                                    <Card 
                                    bgColor='#1a2632' 
                                    variant='elevate'
                                    >
                                        <CardBody>
                                            <Text 
                                            fontFamily='body' 
                                            color='whitesmoke' 
                                            fontSize={{base: '1.15rem', md: '1.25rem'}} 
                                            fontWeight='regular' 
                                            letterSpacing='0.02rem'
                                            >
                                                {review}
                                            </Text>
                                        </CardBody>
                                    </Card>
                                </ListItem>
                            ))}
                            </Slider>
                        </OrderedList>
                    </GridItem>
                    <GridItem 
                    colSpan={{base: '12', md: '7'}} 
                    pl={{base: '0', md: '2rem'}}
                    >
                        {selectedHotel.amenities.length > 0 && (
                            <>
                                <Box
                                display={{base: 'flex', md: 'block'}}
                                justifyContent={{base: 'center', md: 'flex-start'}}
                                alignContent={{base: 'center', md: 'flex-start'}}>
                                <Heading 
                                fontSize={{base: '2rem', md: '2.5rem'}} 
                                fontFamily='heading' 
                                fontWeight='bold' 
                                letterSpacing='0.08rem' 
                                color='whitesmoke' 
                                opacity={0.7}
                                mb='2rem'>
                                    Facilities
                                </Heading>
                                </Box>
                                <SimpleGrid
                                columns='2'
                                gap='0.75rem'
                                
                                >
                                    {selectedHotel.amenities.map((amenity, index) => (
                                        <List 
                                        fontFamily='body' 
                                        fontWeight='regular' 
                                        fontSize={{base: '1.25rem', md: '1.5625rem' }}
                                        color='whitesmoke' 
                                        letterSpacing='0.02rem'>
                                            <ListItem key={index}>
                                                <ListIcon 
                                                as={FaCheckCircle} 
                                                color='gray.200'
                                                />
                                                {amenity}
                                            </ListItem>
                                        </List>
                                    ))}
                                </SimpleGrid>
                                <Stack mt='3rem' 
                                direction={{base: 'column', md: 'row'}} 
                                spacing={{base: '1rem', md: '3rem'}}
                                >
                                <Button
                                onClick={handleGetDirections}
                                minW={{base: '100%', md: '16.28125rem'}}
                                minH='4.375rem' 
                                borderRadius='3.75rem'
                                bg='button'
                                color='primary'
                                letterSpacing='0.09375rem'
                                fontFamily='heading'
                                fontWeight='semibold'
                                >
                                    GET DIRECTIONS
                                </Button>
                                <Button
                                onClick={handleVisitWebsite}
                                minW={{base: '100%', md: '16.28125rem'}}
                                minH='4.375rem' 
                                borderRadius='3.75rem'
                                letterSpacing='0.09375rem'
                                fontFamily='heading'
                                fontWeight='semibold'
                                bgColor='rgba(228, 249, 255, 0.7)'
                                color='white'
                                >
                                    VISIT WEBSITE
                                </Button>
                                </Stack>
                            </>
                        )}
                    </GridItem>
                    
                </Grid>
                <DrawerCloseButton 
                color='white'
                />
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default CustomDrawer
