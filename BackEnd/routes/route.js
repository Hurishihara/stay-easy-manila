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
        const { input } = req.body;
        const checkInput = input.match(/\b(\w+)\b/g)
        if(!checkInput || checkInput.length === 0 || checkInput.every(word => word.length === 1 || word.length === 3)) {
            return res.status(400).send('No valid words found in the input.')
        }

        const vocabulary = getVocabulary();

        const inputArr = checkInput.map(word => {
            if (spell.correct(word) || vocabulary.includes(word.toLowerCase())) {
                return word
            }
            else {
                return null;
            }
        }).filter(word => word !== null)
        
       
        if (inputArr.length < 3) {
            return res.status(400).send('Input must be more than 3 words to get meaningful recommendations.')
        }
        
        else {
            const recommendations = await getRecommendations(inputArr.join(' '));
            res.status(200).json({message: 'Recommendations fetched successfully', data: recommendations});
        }
    }
    catch(err) {
        console.error('Error processing recommendations:', err);
        return res.status(500).send('An error occurred while processing your request');
    }
})

export default router;