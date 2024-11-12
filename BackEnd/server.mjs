import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import api from './routes/route.mjs'

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origin: ['http://localhost:5173', 'https://black-ground-020567c00.5.azurestaticapps.net/'], 
    credentials: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'}))
app.use('/images', express.static('public/images'))
app.use('/api', api)

app.listen(PORT, () => {
    console.log(`Backend Server running on http://localhost:${PORT}`)
})