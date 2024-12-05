import { main } from './dataPreparation.js';
import { fetchSimilarResultsHotel, fetchTopResultHotel } from "../db/db.js";
import { predictionTopResult } from "./knnModel.js";
import { predictionSimilarResult } from "./similarity.js";
import { initializedTfIdf } from './vectorization.js';

const getRecommendations =  async (query, rating = ['5.0', '4.0', '3.0']) => {
    
    try {

        await Promise.all([
            main(rating),
            initializedTfIdf(rating)
        ])

        //Gets the predicted result after passing the user's query TF-IDF as test dataset
        const topResult = await predictionTopResult(query, rating);
        const similarResult = (await predictionSimilarResult(query, rating)).filter(result => result !== topResult);
        const allResult = await Promise.all([fetchTopResultHotel(topResult), fetchSimilarResultsHotel(similarResult)]);
        
        return allResult;
    }
    catch(err) {
        console.error(err);
        return {topResult: null, finalSimilarResults: null};
    }
} 

export { getRecommendations };

