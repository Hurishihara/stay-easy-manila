import { main } from './dataPreparation.js';
import { fetchSimilarResultsHotel, fetchTopResultHotel, validateHotelByLocation } from "../db/db.js";
import { predictionTopResult } from "./knnModel.js";
import { predictionSimilarResult } from "./similarity.js";
import { initializedTfIdf } from './vectorization.js';

const getRecommendations =  async (query, rating, preferredLocation) => {
    console.log(`Recommendation.js: Rating: ${rating}, Preferred Location: ${preferredLocation}`);
    const finalRating = rating && rating.length > 0 ? rating : ['5.0', '4.0', '3.0']
    try {

        await Promise.all([
            main(finalRating, preferredLocation),
            initializedTfIdf(finalRating, preferredLocation)
        ])

        if(preferredLocation) {
            const checkHotels = (await validateHotelByLocation(preferredLocation)).filter(hotel => finalRating.includes(hotel.stars));
        
            if (checkHotels.length === 0) {
                console.log('Recommendation.js: No hotels found in this location')
                return [];
            }
            else if (checkHotels.length < 10) {
                console.log('Recommendation.js: This condition is met')
                return checkHotels;
            }
        }
        
        //Gets the predicted result after passing the user's query TF-IDF as test dataset
        const topResult = await predictionTopResult(query, finalRating, preferredLocation);
        const similarResult = (await predictionSimilarResult(query, finalRating, preferredLocation)).filter(result => result !== topResult);
        const allResult = await Promise.all([fetchTopResultHotel(topResult), fetchSimilarResultsHotel(similarResult)]);
        //console.log(allResult);
        console.log('Recommendation.js: This recommendation is met')
        console.log([allResult[0], ...allResult[1]].length)
        return [allResult[0], ...allResult[1]];
    }
    catch(err) {
        console.error(err);
        return {topResult: null, finalSimilarResults: null};
    }
} 

export { getRecommendations };

