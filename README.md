# StayEasyManila - Hotel Recommendation System

This thesis project implements a **Hotel Recommendation System** for Metro Manila using a hybrid approach that combines **Natural Language Processing (NLP)** for content analysis and **Machine Learning (k-NN)** for generating personalized recommendations. The system analyzes detailed user preferences to suggest the most suitable hotels.

## 🚀 Features

- **Personalized Recommendations:** Get hotel suggestions tailored to your specific preferences for location, star rating, amenities, and more.
- **Content-Based Filtering:** Uses NLP (TF-IDF) to analyze hotel descriptions and match them with user-inputted characteristics.
- **Machine Learning Model:** Employs a k-Nearest Neighbors (k-NN) algorithm with cosine similarity to find the most relevant hotels.
- **Interactive Web Interface:** A modern, responsive React frontend for a seamless user experience.
- **RESTful API:** A robust Node.js/Express backend that handles all recommendation logic and data processing.
- **Database Integration:** Efficiently fetches hotel data from a PostgreSQL database.

## 🛠️ Tech Stack

### 🔹 Frontend

- **React:** A popular JavaScript library for building user interfaces, enabling the creation of reusable UI components.
- **Vite:** A fast build tool and development server that provides instant hot module replacement for a smooth development experience.
- **React-Router:** A routing library for React that enables dynamic navigation and rendering of components based on the URL.
- **ChakraUI:** A modular and accessible component library for React, offering customizable and responsive UI elements.
- **Zustand:** Lightweight state management library for React, enabling simple and scalable global state handling.

### 🔸 Backend

- **Node.js:** A JavaScript runtime environment that allows you to run JavaScript code on the server side, enabling backend development with JavaScript.
- **Express.js:** A minimal and flexible Node.js web application framework that provides a robust set of features for building RESTful APIs and web applications.
- **ml-knn:** A machine learning library for Node.js that implements the k-Nearest Neighbors (k-NN) algorithm for classification and recommendation tasks.
- **ml-pca:** A Node.js library for Principal Component Analysis (PCA), used for dimensionality reduction and feature extraction in machine learning workflows.
- **natural:** A general natural language processing (NLP) library for Node.js, offering tools for tokenization, stemming, classification, and more.
- **PostgreSQL:** An advanced open-source relational database management system known for its reliability, scalability, and support for complex queries.
- **node-pg:** A PostgreSQL client for Node.js that enables seamless interaction with PostgreSQL databases, allowing you to execute queries and manage data from your Node.js applications.

## 📁 Project Structure

```plaintext
stayeasymanila/
├── BackEnd/                 # Node.js/Express API Server
│   ├── db/
│   │   └── db.js           # Database connection & queries
│   ├── ml_pipeline/        # Core ML/NLP logic
│   │   ├── dataPreparation.js # Data fetching & preprocessing
│   │   ├── vectorization.js   # TF-IDF vectorization
│   │   ├── knnModel.js        # k-NN model training & prediction
│   │   ├── similarity.js      # Cosine similarity calculations
│   │   └── recommendation.js  # Main recommendation orchestrator
│   ├── routes/
│   │   └── route.js           # Express API routes
│   ├── server.js          # Express server setup
│   └── package.json
│
└── FrontEnd/
    └── stay-easy-manila/     # React Frontend Application
        ├── src/
        │   ├── store/        # Zustand state management
        │   ├── components/   # React components (NavBar, Cards, etc.)
        │   ├── App.jsx
        │   └── main.jsx
        ├── package.json
        └── vite.config.js
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- A running PostgreSQL database with the required schema

1. **Clone the Repository**

```bash
git clone https://github.com/Hurishihara/stayeasymanila.git
cd stayeasymanila
```
2. **Backend Setup**

```bash
# Navigate to the backend directory
cd BackEnd

# Install dependencies
npm install

# Set up environment variables
# Create a .env file and configure your database credentials
# DB_USER=your_username
# DB_HOST=your_host
# DB_DATABASE=your_database_name
# DB_PASSWORD=your_password
# DB_PORT=your_port (usually 5432)

# Start the backend development server
npm run start
```

The backend API will run on `http://localhost:3000`


3. **Frontend Setup**

```bash
# Open a new terminal and navigate to the frontend directory
cd FrontEnd/stay-easy-manila

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

The frontend application will run on `http://localhost:5173`

## 🗄️ Database Schema

The application expects a PostgreSQL database with at least two main tables: `hotel_info` and `hotel_details`. The key fields are:

- `hotel_info`: `id` (PK), `hotel_name`, `stars`, `location`, and `description`
- `hotel_details`: `hotel_id` (FK), `hotel_short_description`, `reviews`, `image_folder_path`, `website_link`, and `amenities`

## 🔧 Usage

1. **Open the Application:** Navigate to `http://localhost:5173` in your browser.
2. **Specify Preferences:** On the homepage, click "GET STARTED" and fill out the form:
   - Select desired star ratings (5-star, 4-star, 3-star).
   - Choose a preferred location in Metro Manila (e.g., Makati, Taguig).
   - Describe preferred hotel characteristics (e.g., "Luxury, Modern").
   - List desired amenities (e.g., "Swimming Pool, Gym").
   - Add any additional requests.
3. **Get Recommendations:** Submit the form. The system will process your request and redirect you to a page displaying personalized hotel
recommendations.
4. **View Details:** Click on any hotel card to view more details, photos, reviews, and amenities in a full-screen drawer. Options to get directions or visit the hotel's website are provided.

## 🤖 How the Recommendation Engine Works

1. **Data Preprocessing:** Hotel descriptions are fetched from the DB, tokenized, and stopwords are removed.
2. **Vectorization:** A TF-IDF model is created from the processed descriptions, converting text into numerical vectors.
3. **Dimensionality Reduction:** PCA is applied to the TF-IDF vectors to reduce complexity while retaining 95% of the variance.
4. **Model Training:** A k-NN model is trained on the reduced dataset, using hotel names as labels and cosine similarity as the distance metric.
5. **Prediction:** The user's query is transformed into a TF-IDF vector, reduced via PCA, and fed into the k-NN model to find the most similar hotels (`k=15`).
6. **Result:** The top result and a list of similar hotels are returned and displayed to the user.

## Note

- **Academic Purpose:** This system was developed as part of a Computer Science thesis project. It is intended for research, learning, and demonstration of machine learning and natural language processing techniques in the context of hotel recommendations.
- **Data Dependency:** The quality and accuracy of recommendations depend heavily on the completeness and correctness of the hotel dataset. Limited or inconsistent data may lead to suboptimal results.
- **Performance Limitations:** The system uses TF-IDF and k-NN with cosine similarity, which work well for small to medium datasets. However, performance may degrade if scaled to very large datasets without further optimization.
- **Active Development:** Additional features such as user accounts, review integration, multi-language support, and advanced filtering are planned but not yet fully implemented.
- **Not a Production System:** This project is designed for **academic research and prototype demonstration only**. It is **not optimized for commercial deployment** or large-scale production use.
- Future Enhancements:
    - Integration with real-time hotel APIs (Agoda, Booking.com, etc.)
    - Support for hybrid recommendation approaches (content + collaborative filtering)
    - Enhanced personalization with user history and feedback
    - Export/Report generation for hotel comparisons

