import React from 'react'
import { Box, Heading, Badge, Image, Card, CardBody, HStack, Text, Divider, CardFooter, Button, Stack, AspectRatio } from '@chakra-ui/react'
import { FaStar } from "react-icons/fa";


const CustomCard = ({hotelName, result, description, starRating, hotelType, imagePath, onClick}) => {
    
    const api = 'http://localhost:3000'
    
    const truncateDescription = (description, maxLength) => {
      if(!description) return '';
      return description.length > maxLength ? `${description.substring(0, maxLength)}...` : description;
    }
  
    const truncateRating = (rating) => {
      switch(rating) {
        case '5.0':
          return '5'
        case '4.5':
          return '4.5'
        case '4.0':
          return '4'
        case '3.5':
          return '3.5'
        case '3.0':
          return '3'
        default:
          return 'Unknown rating'
      }
    }
  
    const setStars = (rating) => {
      return Array.from({length: +rating}).map((_, index) => {
        return <FaStar key={index} color='black'/>
      })
    }

    return (
    <>
        <Box
        onClick={onClick}
        cursor='pointer'
        
        >
            <Card bgColor='primary'
            overflow='hidden'
            borderRadius='2.1875rem'
            p={{base: '1rem', md: '1.5rem'}}
            m={{base: '0.5rem', md: '1.5rem'}}
            boxShadow='0px 4px 4px rgba(0, 0, 0, 0.50)'
            >
                <Box>
                  <AspectRatio ratio={16/9}>
                    <Image 
                    src={`${api}${imagePath}/image1.jpg`}
                    borderRadius='2.1875rem'
                    />
                  </AspectRatio>
                </Box>
                <CardBody>
                    <Heading
                      color='black'
                      fontFamily='homePageHeading'
                      fontWeight='bold'
                      fontSize={{base: '1.25rem', md: '1.5rem'}}
                      >
                        {hotelName}
                    </Heading>
                        
                   
                    <Text
                    fontFamily='body'
                    fontWeight='regular'
                    
                    mt='1.5rem'
                    fontSize={{base: '0.9rem', md: '1.2rem'}}
                    >
                        {truncateDescription(description, 150)}
                    </Text>
                    <HStack
                    gap='0.25rem'
                    mt={{base: '0.5rem', md: '1rem'}}
                    >
                        {setStars(starRating)}
                        <Box>
                            <Text
                            
                            fontFamily='body'
                            fontWeight='bold'
                            fontSize={{base: '0.9rem', md: '1.2rem'}}
                            ml='0.25rem'
                            >
                                {`${truncateRating(hotelType)}-star Hotel`}
                            </Text>
                        </Box>
                    </HStack>
                </CardBody>
            </Card>
        </Box>
    </>
  )
}

export default CustomCard
