import {
    Container,
    Flex,
    Grid,
    HStack,
    Heading,
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
import { useClickStore } from './store/clickStore.js'

function NavBar () {
    const location = useLocation();
    const resetClicked = useClickStore(state => state.resetClicked);

    const handleHomeClick = () => {
        resetClicked();
    }

    const isOnRecommendationPage = location.pathname.includes('/recommendations');
    console.log(isOnRecommendationPage);

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
                <Text
                fontFamily='title'
                fontSize='1.5625rem'
                color='fontColor'
                >
                    About Us
                </Text>
            </HStack>
            <Menu>
                <MenuButton 
                as={IconButton}
                aria-label='Open Menu'
                icon={<RxHamburgerMenu />}
                variant='unstyled'
                color='white'
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