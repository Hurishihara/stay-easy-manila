import express from 'express';
import en from 'dictionary-en'
import nspell from 'nspell'
import { getRecommendations } from '../ml_pipeline/recommendation.js'
import { getVocabulary } from '../ml_pipeline/vectorization.js'
const router = express.Router();
const spell = nspell(en)

router.get('/', (req, res) => {
    res.send('Hello World!')
})


router.post('/recommendations', async (req, res) => {
    try {
        const { hotelRating, input, preferredLocation } = req.body;
        console.log('Route.js: ', hotelRating, input, preferredLocation)
        const recommendations = await getRecommendations(input, hotelRating, preferredLocation);
        res.status(200).json({message: 'Recommendations fetched successfully', data: recommendations});
    }
    catch(err) {
        console.error(err)
    }
})

export default router;