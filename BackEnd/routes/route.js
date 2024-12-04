import express from 'express';
import en from 'dictionary-en'
import nspell from 'nspell'
import { getRecommendations } from '../recommendation.js'
import { getVocabulary } from '../vectorization.js'
const router = express.Router();
const spell = nspell(en)

router.get('/', (req, res) => {
    res.send('Hello World!')
})


router.post('/recommendations', async (req, res) => {
    try {
        const { hotelRating, input } = req.body;
        
        const recommendations = await getRecommendations(input, hotelRating);
        res.status(200).json({message: 'Recommendations fetched successfully', data: recommendations});
    }
    catch(err) {
        console.error(err)
    }
})

export default router;