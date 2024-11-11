import React from 'react'
import { Box, Heading, Badge, Image, Card, CardBody, HStack, Text, Divider, CardFooter, Button, Stack } from '@chakra-ui/react'
import { FaStar } from "react-icons/fa";

const CustomCard = ({hotelName, result, description, starRating, hotelType, imagePath, onClick}) => {
    
    const api = 'http://localhost:5000'
    
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
        return <FaStar key={index} color='yellow'/>
      })
    }

    return (
    <>
        <Box
        onClick={onClick}
        cursor='pointer'>
            <Card bgColor='#CAF4FF'
            maxW={{base: 'sm', md: 'xl'}} 
            borderRadius='2.5rem'
            mb={{base: '2.5rem', md: '5rem'}}
            mt={{base: '2.5rem', md: '5rem'}}
            >
                <Box>
                    <Image 
                    src={`${api}${imagePath}/image1.jpg`}
                    borderTopRadius='2.1875rem' 
                    />
                </Box>
                <CardBody>
                    <Stack
                    spacing={{base: '0.35rem', md: '0.65rem'}}
                    direction={{base: 'column', md: 'row'}}
                    >
                        <Heading
                        color='primary'
                        fontFamily='heading'
                        fontWeight='bold'
                        fontSize={{base: '1.25rem', md: '1.5625rem'}}
                        >
                            {hotelName}
                        </Heading>
                        <Box>
                        <Badge
                        fontFamily='body'
                        variant='solid'
                        colorScheme={result === 'Top Result' ? 'green' : 'gray'}
                        >
                            {result}
                        </Badge>
                        </Box>
                    </Stack>
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
                            color='primary'
                            fontFamily='body'
                            fontWeight='regular'
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
