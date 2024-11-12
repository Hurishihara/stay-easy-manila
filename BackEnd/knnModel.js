import KNN from 'ml-knn';
import { PCA } from 'ml-pca';
import { getTfIdfVector, getVocabulary, initializedTfIdf } from './vectorization.js';
import { fetchHotel } from './db.js';



const getHotelNames = async () => {
    
    try {
        const hotelName = await fetchHotel(); // Get the hotel names from the database
        const listOfHotelNames = hotelName.map(row => row.hotel_name); // Map the results to get only the hotel names
        return listOfHotelNames; // Return the list of hotel names
    }
    catch (err) {
        throw new Error(err) // Throw an error if there's an issue
    };
};



const getTfIdfScores = (tfidf) => {
    const vocab = getVocabulary();
    
    const allScores = [];
    for (let i = 0; i < tfidf.documents.length; i++) {
        const documentScores = new Array(vocab.length).fill(0);
        const terms = tfidf.listTerms(i);

        terms.forEach(term => {
            const termIndex = vocab.indexOf(term.term);
            if (termIndex !== -1) {
                documentScores[termIndex] = term.tfidf;
            }
        });
        allScores.push(documentScores);
    }
    return allScores;
}
    

let pca;
const initializedKNN = async () => {
    const tfidf = await initializedTfIdf(); // Initializes the TF-IDF Model
    const train_labels = await getHotelNames(); // Gets the hotel names to be used as labels
    const train_dataset = getTfIdfScores(tfidf); // Gets the TF-IDF Scores for all documents

    pca = new PCA(train_dataset); // Instantiates the PCA Model
    const explainedVariance = pca.getExplainedVariance(); // Gets the explained variance
    let cumulativeVariance = 0; // Initializes the cumulative variance
    let nComponents = 0; // Initializes the number of components
    
    // Loop through the explained variance to get the number of components that explains 95% of the variance
    for(let i = 0; i < explainedVariance.length; i++) {
        cumulativeVariance += explainedVariance[i];
        if(cumulativeVariance >= 0.95) {
            nComponents = i + 1;
            break;
        }
    }
    console.log(`Number of Components: ${nComponents}`); // Logs the number of components
    const reducedDataset = pca.predict(train_dataset, { nComponents: 98 }).to2DArray(); // Reduces the dataset using PCA
    const knn = new KNN(reducedDataset, train_labels, { k: 15}); // Instantiates the KNN Model
    return knn;
}

const predictionTopResult = async (query) => {
    const knn = await initializedKNN(); // Get the knn model
    const userQueryVector = await getTfIdfVector(query); // Get the TF-IDF Vector for the user's query
    const reduceQueryVector = pca.predict([userQueryVector], {nComponents: 98}).to1DArray() // Reduce the query vector using PCA
    
    const result = knn.predict(reduceQueryVector); // Predict the result
    return result;
    
}

 export { predictionTopResult, getHotelNames, getTfIdfScores };
