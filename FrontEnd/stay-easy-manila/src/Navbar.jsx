import {
    Flex,
    HStack,
    Spacer,
    Text,
    Box,
    Link as ChakraLink,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    MenuDivider,
} from '@chakra-ui/react'
import { RxHamburgerMenu } from "react-icons/rx";
import {Link as ReactRouterLink, useLocation} from 'react-router-dom'
import { useHotelStore } from './store/hotelStore.js';

function NavBar () {
    const location = useLocation();
    const { clearHotel } = useHotelStore()

    const handleHomeClick = () => {
        clearHotel();
    }

    const isOnRecommendationPage = location.pathname.includes('/recommendations');

    return (
        <Flex
        pl={{base: '2rem', md: '3rem'}}
        pr={{base: '2rem', md: '3rem'}}
        pt='1rem'
        >
            <Box>
                {!isOnRecommendationPage && (
                    <Text
                fontFamily='title'
                fontWeight='bold'
                color='fontColor'
                fontSize={{base: '1.5625rem', md: '2.1875rem'}}
                >
                    StayEasyManila
                </Text>
                )}
                
            </Box>
            <Spacer />
            <HStack 
            spacing='9.0625rem'
            display={{base: 'none', md: 'flex'}}>
                <ChakraLink
                as={ReactRouterLink}
                to='/'
                fontFamily='title'
                fontSize='1.5625rem'
                onClick={handleHomeClick}
                color='fontColor'
                >
                    Home
                </ChakraLink>
            </HStack>
            <Menu>
                <MenuButton 
                as={IconButton}
                aria-label='Open Menu'
                icon={<RxHamburgerMenu />}
                variant='unstyled'
                color='fontColor'
                display={{base: 'flex', md: 'none'}}
               
                />
                <MenuList
                color='black'
                fontFamily='title'>
                    <MenuItem
                    as={ReactRouterLink}
                    to='/'
                    onClick={handleHomeClick}
                    
                    >
                        Home
                    </MenuItem>
                    <MenuDivider/>
                    <MenuItem
                    
                    >
                        About Us
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}

export default NavBar;