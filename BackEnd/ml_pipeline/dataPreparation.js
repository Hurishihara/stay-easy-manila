import fs from 'fs'
import natural from 'natural'
import { fetchHotel } from '../db/db.js';


// Initialize TF-IDF Model using the 'natural' library
const TfIdf = natural.TfIdf;
let tfidf;

// Get the descriptions from the database
const getHotelDescriptions = async (rating) => {
    try{
        const hotelDescription = await fetchHotel()
        if (Array.isArray(rating) && rating.length > 0) {
            return hotelDescription.filter(hotel => rating.includes(hotel.stars)).map(row => row.description)
        }
        else {
            return hotelDescription.map(row => row.description)
        }
    }
    catch(err) {
        console.error(err)
    }
}

// Function to preprocess text by tokenizing and removing stopwords
const preprocess = (text) => {
    
    // Tokenize text into lowercase tokens and remove stopwords
    const tokens = customTokenizer(text)
    const filteredTokens = tokens.filter(token => !natural.stopwords.includes(token))
    return filteredTokens;
}
const customTokenizer = (text) => {
    return text.toLowerCase().match(/[a-z0-9]+/g) || [];
}

// Main function to load the TF-IDF Model
const main = async (rating) => {
    
    // Load the TF-IDF Model if it exists, otherwise create a new one
    tfidf = new TfIdf();

    // Await the hotel descriptions
    const hotelDescriptions = await getHotelDescriptions(rating)
    
    /* Preprocess the sample TF-IDF Model Data into array of tokens
    For example: ['Luxury', 'Hotel, 'Pool' 'Spa'], ['Budget, 'Hotel', 'Free', Wifi], etc
    Removed the stop words like 'with', 'and', etc. That may give inconsistencies to the TF-IDF Model */
    const processedDescriptions = hotelDescriptions.map(description => preprocess(description))

    // Add the preprocessed hotel descriptions to TF-IDF model
    processedDescriptions.forEach(processedDescription => {
        tfidf.addDocument(processedDescription)
    })
    
    return tfidf;
}


// Exports the functions
export { preprocess, main };