import express from 'express';
import { getRecommendations } from '../ml_pipeline/recommendation.js'

const router = express.Router();

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