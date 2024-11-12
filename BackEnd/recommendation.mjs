import { fetchSimilarResultsHotel, fetchTopResultHotel } from "./db.mjs";
import { predictionTopResult } from "./knnModel.mjs";
import { predictionSimilarResult } from "./similarity.mjs";

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

