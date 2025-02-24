import { getHotelNames, getTfIdfScores, normalizeTfIdfDataset, normalize } from "./knnModel.js";
import { getTfIdfVector, initializedTfIdf } from "./vectorization.js";
import { PCA } from "ml-pca";


const tfidf = await initializedTfIdf();
const hotelScores = getTfIdfScores(tfidf);
const pca = new PCA(hotelScores);


const getComponentsForVariance = (pca, varianceThreshold = 0.95) => {
    const explainedVariance = pca.getExplainedVariance();
    let cumulativeVariance = 0;
    let numComponents = 0;

    for (let i = 0; i < explainedVariance.length; i++) {
        cumulativeVariance += explainedVariance[i];
        numComponents++;
        if (cumulativeVariance >= varianceThreshold) {
            break;
        }
    }
    return numComponents;
};

const numComponents = getComponentsForVariance(pca, 0.95);


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

// Function to predict the top result
const predictionSimilarResult = async (query, rating, preferredLocation) => {
    const labels = await getHotelNames(rating, preferredLocation);
    console.log('Similarity.js, Labels.length: ', labels.length)
    const userQueryVector = await getTfIdfVector(query);
    const normalizeUserQuery = normalize(userQueryVector);
    
    const reducedUserQueryVector = pca.predict([normalizeUserQuery], {nComponents: numComponents}).to1DArray();
    
    const normalizeHotelScores= normalizeTfIdfDataset(hotelScores);
    const reducedHotelScores = pca.predict(normalizeHotelScores, {nComponents: numComponents}).to2DArray();
    
    const scores = labels.map((label, index) => {
        const similarity = cosineSimilarity(reducedUserQueryVector, reducedHotelScores[index]);
        //console.log(`Similarity between ${query} and ${label}: ${similarity}`);
        return {hotel: label, score: similarity};
        
    });

   const numberOfResults = Math.min(Math.floor(labels.length / 4), 13)
   console.log('Similarity.js, numberOfResults and labels.length: ', numberOfResults, labels.length)
   const topScores = scores.sort((a, b) => b.score - a.score).slice(0, numberOfResults);
   const results = topScores.map(({ hotel }) => hotel);
    return results;
}

export { predictionSimilarResult };