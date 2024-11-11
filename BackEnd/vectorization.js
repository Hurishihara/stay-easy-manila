import natural from 'natural'
// Imports the TF-IDF Model and the preprocess function
import { preprocess, loadTfIdfModel, main } from './dataPreparation.js';

// Imports the natural library's TF-IDF class
const TfIdf = natural.TfIdf; 

// Function to initialize the TF-IDF Model
const initializedTfIdf = async () => {
   
    // Calls the main function to get the TF-IDF Model
    const tfidfRawData = await main(); 
    
    if (!tfidfRawData) {
        throw new Error("TF-IDF Model not initialized. Please check the main function")
    }
    // Instantiates a new TF-IDF Model
    const tfidf = new TfIdf(tfidfRawData);
    return tfidf;
}

const tfidf = await initializedTfIdf(); // Initializes the TF-IDF Model


let vocabulary = []; // Initialized an empty array to be populated with the Vocabulary

// Function to get the Vocabulary
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


// Function to compute TF-IDF vector for the user's query
const getTfIdfVector = async (query) => {
    const vocab = getVocabulary();
    if(vocab.length === 0) {
        throw new Error ("Vocabulary length is not initialized. Please check the getVocabulary function")
    }

    // Preprocesses the User's Query
    const preProcessedUserQuery = preprocess(query);  
    
    // Initialized an empty array to be populated with TF-IDF Scores of the User's Query
    const queryVector = new Array(vocab.length).fill(0)
    
    // Computes the TF-IDF Scores for the User's Query
     tfidf.tfidfs(preProcessedUserQuery, (i, measure) => {
        queryVector[i] = measure
    })
    return queryVector;
}

//console.log(await getTfIdfVector('Looking for a luxurious hotel with modern amenities'))// Test the function) 
export { getTfIdfVector, getVocabulary, initializedTfIdf } // Exports the function

