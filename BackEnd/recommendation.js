import { fetchSimilarResultsHotel, fetchTopResultHotel } from "./db.js";
import { predictionTopResult } from "./knnModel.js";
import { predictionSimilarResult } from "./similarity.js";

const getRecommendations =  async (query) => {
    
    try {
        // Gets the predicted result after passing the user's query TF-IDF as test dataset
        const topResult = await predictionTopResult(query);
        const similarResult = (await predictionSimilarResult(query)).filter(hotel => !topResult.includes(hotel));
        const allResult = await Promise.all([fetchTopResultHotel(topResult), fetchSimilarResultsHotel(similarResult)]);
        
        return allResult;
    }
    catch(err) {
        console.error(err);
        return {topResult: null, finalSimilarResults: null};
    }
} 

export { getRecommendations };

