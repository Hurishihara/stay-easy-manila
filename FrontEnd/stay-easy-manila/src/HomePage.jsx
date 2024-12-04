import NavBar from "./Navbar";
import HeroSection from "./HeroSection";
import { Box } from "@chakra-ui/react";

function HomePage () {
    return(
        <Box bgColor='primary'>
            <NavBar />
            <HeroSection />
        </Box>
    )
}

export default HomePage;