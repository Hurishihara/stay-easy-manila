import fs from 'fs'
import natural from 'natural'
import { fetchHotel } from './db.js';


// Initialize TF-IDF Model using the 'natural' library
const TfIdf = natural.TfIdf;
let tfidf;

// Get the descriptions from the database
const getHotelDescriptions = async () => {
    try{
        const hotelDescription = await fetchHotel()
        // Map the results to get only the descriptions
        const listOfHotelDescriptions = hotelDescription.map(row => row.description)
        return listOfHotelDescriptions
    }
    catch(err) {
        console.error(err)
    }
}

// Function to preprocess text by tokenizing and removing stopwords
const preprocess = (text) => {
    
    // Tokenize text into lowercase tokens and remove stopwords
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(text.toLowerCase())
    return tokens.filter(token => !natural.stopwords.includes(token))
}

let vocabulary = [];

const getVocabulary = () => {
    
    if (vocabulary.length === 0) {
        const vocabSet = new Set();
        for (let index = 0; index < tfidf.documents.length; index++) {
            const terms = tfidf.listTerms(index);
            terms.forEach(term => {
                vocabSet.add(term.term);
            });
        }
        vocabulary = Array.from(vocabSet);
    }
    return vocabulary;
}

// Function to get TF-IDF Scores for all documents
const getTfIdfScores = () => {
    const vocabularyLength = getVocabulary().length;
    const allScores = [];
    for (let i = 0; i < tfidf.documents.length; i++) {
        const documentScores = new Array(vocabularyLength).fill(0);
        const terms = tfidf.listTerms(i)
        // Populated
        //console.log(`Terms for Document ${i}:`, terms);
        terms.forEach(term => {
            const termIndex = getVocabulary().indexOf(term.term);
            if (termIndex !== -1) {
                documentScores[termIndex] = term.tfidf
            }
        });
        allScores.push(documentScores)
        console.log(`Scores for Document ${i}:`, documentScores);
    }
    
    return allScores;
}



const saveTfIdfModel = () => {
    const tfidfData = JSON.stringify(tfidf);
    fs.writeFileSync('tfidfModel.json', tfidfData);
}

const loadTfIdfModel = () => { 
   
    if (!fs.existsSync('tfidfModel.json')) {
        console.log('TF-IDF Model not found. Please run the main function to create the model.');
    }

    const jsonData = fs.readFileSync('tfidfModel.json', 'utf8');
       

    return jsonData;
}

// Main function to load the TF-IDF Model
const main = async () => {
    
    // Check if the TF-IDF Model exists
    if(fs.existsSync('tfidfModel.json')) {
        const tfidfRawData = JSON.parse(loadTfIdfModel());
        return tfidfRawData;
    }

    // Load the TF-IDF Model if it exists, otherwise create a new one
    tfidf = new TfIdf();

    // Await the hotel descriptions
    const hotelDescriptions = await getHotelDescriptions()
    

    if (hotelDescriptions.length === 0) {
        console.error('No hotel descriptions found, exiting.');
        return; // Exit if no descriptions are found
    }

    /* Preprocess the sample TF-IDF Model Data into array of tokens
    For example: ['Luxury', 'Hotel, 'Pool' 'Spa'], ['Budget, 'Hotel', 'Free', Wifi], etc
    Removed the stop words like 'with', 'and', etc. That may give inconsistencies to the TF-IDF Model */
    const processedDescriptions = hotelDescriptions.map(description => preprocess(description))

    // Add the preprocessed hotel descriptions to TF-IDF model
    processedDescriptions.forEach(processedDescription => {
        tfidf.addDocument(processedDescription)
    })
    
    // Save the TF-IDF Model
    saveTfIdfModel();
    console.log('TF-IDF model saved successfully.');
}
   
// Exports the functions
export { loadTfIdfModel, preprocess, main };