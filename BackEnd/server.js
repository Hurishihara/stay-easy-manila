import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import en from 'dictionary-en'
import nspell from 'nspell'
import { getRecommendations } from './recommendation.js'
import { getVocabulary } from './vectorization.js'
const app = express()
const port = process.env.port || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origin: ['http://localhost:5173', 'https://black-ground-020567c00.5.azurestaticapps.net/'], 
    credentials: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'}))
app.use('/images', express.static('public/images'))

const spell = nspell(en)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/recommendations', async (req, res) => {
    
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





app.listen(port, () => {
    console.log(`Backend Server running on http://localhost:${port}`)
})