import KNN from 'ml-knn';
import { PCA } from 'ml-pca';
import { getTfIdfVector, getVocabulary, initializedTfIdf } from './vectorization.js';
import { fetchHotel } from './db.js';
import e from 'cors';

const getHotelNames = async (rating) => {
    
    try {
        const hotelName = await fetchHotel(); // Get the hotel names from the database
        if (Array.isArray(rating) && rating.length > 0) {
            return hotelName.filter(hotel => rating.includes(hotel.stars)).map(row => row.hotel_name); // Filter the hotel names based on the rating
        }
        else {
            return hotelName.map(row => row.hotel_name); // Return all the hotel names
        }
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

// Min-Max Normalization Function
const normalize = (data) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    return data.map(value => (value -min) / (max - min)) // Scale values to [0, 1]
}

const normalizeTfIdfDataset = (dataset) => {
    return dataset.map(document => normalize(document));
}


// Cosine Similarity Function
const cosineSimilarity = (vec1, vec2) => {
     
    // Check if the vectors are arrays
    vec1 = Array.isArray(vec1) ? vec1 : Array.from(vec1);
    vec2 = Array.isArray(vec2) ? vec2 : Array.from(vec2);

    const dotProduct = vec1.reduce((sum, value, index) => sum + value * vec2[index], 0);
    const magnitude1 = Math.sqrt(vec1.reduce((sum, value) => sum + Math.pow(value, 2), 0))
    const magnitude2 = Math.sqrt(vec2.reduce((sum, value) => sum + Math.pow(value, 2), 0))
    
    // Check if the magnitude is zero
    if(magnitude1 === 0 || magnitude2 === 0) {
        return 0;
    }
    return dotProduct / (magnitude1 * magnitude2);
}

let pca;
const initializedKNN = async (rating) => {
    const tfidf = await initializedTfIdf(rating); // Initializes the TF-IDF Model
    const train_labels = await getHotelNames(rating); // Gets the hotel names to be used as labels
    const train_dataset = getTfIdfScores(tfidf); // Gets the TF-IDF Scores for all documents
    
    const normalizeDataset = normalizeTfIdfDataset(train_dataset); // Normalizes the dataset
    console.log(normalizeDataset)
    pca = new PCA(normalizeDataset); // Instantiates the PCA Model

    //pca = new PCA(train_dataset); // Instantiates the PCA Model
    
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
    const reducedDataset = pca.predict(normalizeDataset, { nComponents: nComponents }).to2DArray(); // Reduces the dataset using PCA
    
    const knn = new KNN(reducedDataset, train_labels, { k: 9, distance: cosineSimilarity }); // Instantiates the KNN Model
    return { knn, nComponents};
}

const predictionTopResult = async (query, rating) => {
    const { knn, nComponents } = await initializedKNN(rating); // Get the knn model
    const userQueryVector = await getTfIdfVector(query); // Get the TF-IDF Vector for the user's query
    const normalizeQueryVector = normalize(userQueryVector); // Normalize the query vector
    const reduceQueryVector = pca.predict([normalizeQueryVector], {nComponents: nComponents }).to1DArray() // Reduce the query vector using PCA
    //console.log(normalizeQueryVector)
    const result = knn.predict(reduceQueryVector); // Predict the result
    return result;
    
}

//console.log(await predictionTopResult('Luxurious hotel with spa business centre fitness centre and modern amenities contemporary design', ['4.0']));

 export { predictionTopResult, getHotelNames, getTfIdfScores, initializedKNN, normalizeTfIdfDataset, normalize };
