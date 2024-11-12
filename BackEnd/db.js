import pg from 'pg'
import env from 'dotenv'

env.config()

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
})

const connectDatabase = async () => {
    try {
        await db.connect()
        console.log('Connected to database successfully')
    }
    catch (err) {
        throw new Error(err)
    }
}

connectDatabase()

export const fetchHotel = async () => {
    try {
        
        const res = await db.query('SELECT * FROM hotel_info ORDER BY ID ASC')
        return res.rows;
    }
    catch(err) {    
        console.error(err)
    }
}

const fetchTopResultHotel = async (hotelName) => {
    
    const query = 
    `
    SELECT hotel_name, stars, hotel_short_description, reviews, image_folder_path, website_link, amenities
    FROM hotel_info
    JOIN hotel_details
    ON hotel_info.id = hotel_details.hotel_id
    WHERE hotel_name = $1
    `

    try {
        const res = await db.query(query, [hotelName])
        return res.rows[0];
    }
    catch(err) {
        console.error(err)
    }
}

 const fetchSimilarResultsHotel = async (hotelNames) => {
    
    const orderByCase = hotelNames.map((names, index) => {
        return `WHEN hotel_name = '${names.replace(/'/g, "''")}' THEN ${index + 1}`
    }).join(' ')

    const query = 
    `
    SELECT hotel_name, stars, hotel_short_description, reviews, image_folder_path, website_link, amenities
    FROM hotel_info
    JOIN hotel_details
    ON hotel_info.id = hotel_details.hotel_id
    WHERE hotel_name = ANY($1::text[])
    ORDER BY CASE ${orderByCase} END
    `;
    
    try {
        const res = await db.query(query, [hotelNames])
        return res.rows;
    }
    catch(err) {
        console.error(err)
    }
}

const hotelNames = [
    'The Mini Suites Eton Tower Makati',
    'Vivere Hotel',
    'Dusit Thani Manila',
    'New World Makati Hotel',
    "I'M Hotel",
    'Makati Shangri-La',
    'The Peninsula Manila',
    'Manila Marriott Hotel',
    'Fairmont Makati',
    'The Manila Hotel',
    'Solaire Resort',
    'Conrad Manila',
    'Grand Hyatt Manila',
    'Raffles Makati'
  ]

export { fetchSimilarResultsHotel, fetchTopResultHotel };