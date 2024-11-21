import NavBar from "./Navbar";
import HeroSection from "./HeroSection";
import { useState } from "react";
import { Box, AspectRatio } from "@chakra-ui/react";

function HomePage () {
    return(
        <Box bgColor='primary'>
            <NavBar />
            <HeroSection />
        </Box>
    )
}

export default HomePage;