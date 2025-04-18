# Rhythmix
Rhythmix is a natural language song recommender web application built with a Django backend and a React frontend. It allows users to describe their mood or feelings in natural language, and an LLM predicts song attributes to recommend the top 5 most similar songs from a vectorized song database. Users can also modify predicted attributes to refine their recommendations.


## Motivation
Rhythmix was initially developed as a song recommender using Streamlit. To explore modern frontend development, I rebuilt the application using React for a dynamic user interface and Django for a robust backend. This project showcases my learning journey with React while enhancing the song recommendation system with advanced natural language processing and vector search capabilities.

## Features
- **Natural Language Input:** Describe your mood or feelings (e.g., "I’m feeling upbeat and nostalgic"), and the LLM predicts song attributes like tempo, energy, and mood.
- **Song Recommendations:** Retrieves the top 5 songs from a vectorized song database based on predicted attributes.
- **Attribute Customization:** Users can tweak predicted song attributes before generating recommendations for a personalized experience.
- **Save Your Songs:** Save your favorite song recommendations and view them in a separate tab, allowing you to revisit and listen to newly discovered songs at any time.

## Demo
https://github.com/user-attachments/assets/1e28bf9a-e8cb-4787-a473-8c6e19d9d296


## Project Structure
```
.
├── rhythmix
│   ├── backend                       # Django backend
│   │   ├── api
│   │   ├── configs
│   │   ├── crud
│   │   └── langgraph_integration     # Langgraph
│   ├── manage.py
│   └── frontend                      # React frontend
│       ├── public
│       ├── src
│       │   ├── assets
│       │   └── components
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── pyproject.toml
└── uv.lock
```

## Technologies Used
### Backend
- Django
- LangGraph
- Qdrant

### Frontend
- React
- Axios
- Vite

### Dataset
- Song dataset sourced from [Kaggle](https://www.kaggle.com/datasets/thedevastator/spotify-tracks-genre-dataset), indexed in a Qdrant vector database.

## Installation
Follow these steps to set up Rhythmix locally.

### Prerequisites
Set up your ``.env`` in the project root folder with the following key

```bash
OPENAI_API_KEY = ""
QDRANT_API_KEY = ""
QDRANT_ENDPOINT = ""
```

### Getting Started
Clone the repository
```bash
git clone https://github.com/Joanna-Khek/rhythmix
cd rhythmix
```

Install the Python dependencies
```bash
uv sync
```

Download the data
```bash
uv run backend/langgraph_integration/preprocessing/download_data.py
```

Set up the vector database
```bash
uv run backend/langgraph_integration/preprocessing/create_vector_db.py
```

Set up frontend server
```bash
cd frontend
npm install
npm run dev
```

Set up backend server
```bash
cd backend
uv run python manage.py migrate
uv run python manage.py runserver
```

