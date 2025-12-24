# San Francisco OpenStreetMap Application

A FastAPI backend with a React frontend displaying an interactive OpenStreetMap of San Francisco, CA.

## Features

- Interactive map with zoom and pan capabilities
- Centered on San Francisco, CA (37.7749° N, 122.4194° W)
- Built with React, Vite, and react-leaflet
- FastAPI backend with CORS support

## Setup

### Prerequisites

- Python 3.13+
- Node.js and npm

### Backend Setup

1. Install Python dependencies:
```bash
uv sync
# or
pip install -e .
```

2. Run the FastAPI server:
```bash
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Development

### Running Both Servers

1. **Terminal 1** - Start the FastAPI backend:
```bash
uvicorn main:app --reload
```

2. **Terminal 2** - Start the React frontend:
```bash
cd frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Production Build

1. Build the React frontend:
```bash
cd frontend
npm run build
```

2. The built files will be in `frontend/dist/`

3. Start the FastAPI server (it will automatically serve the built frontend):
```bash
uvicorn main:app
```

4. Open `http://localhost:8000` in your browser.

## Project Structure

```
jltg_hide_and_seek_mapper/
├── main.py                 # Application entry point (for uvicorn)
├── bin/                    # Executable scripts
│   ├── convert_csvs.py    # Convert CSV files to JSON
│   └── geocode_museums.py # Geocode museum addresses
├── src/                    # Backend source code (model-view architecture)
│   ├── main.py            # Application initialization
│   ├── core/              # Core application setup
│   │   ├── app.py         # FastAPI app factory
│   │   └── config.py      # Configuration utilities
│   ├── models/            # Data models and schemas
│   │   └── schemas.py     # Pydantic schemas
│   ├── services/          # Business logic layer
│   │   ├── data_service.py      # Data loading services
│   │   ├── geocoding_service.py # Geocoding services
│   │   ├── boundary_service.py  # Boundary fetching services
│   │   └── csv_service.py       # CSV conversion services
│   └── views/             # API endpoints (routers)
│       ├── health.py      # Health check endpoints
│       ├── categories.py  # Category data endpoints
│       ├── boundaries.py  # Geographic boundary endpoints
│       └── geocoding.py   # Geocoding endpoints
├── data/                   # JSON data files
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React app component
│   │   ├── main.jsx       # React entry point
│   │   ├── components/    # React components
│   │   │   ├── Map/       # Map-related components
│   │   │   │   ├── Map.jsx
│   │   │   │   ├── MapControls.jsx
│   │   │   │   ├── GreyOverlay.jsx
│   │   │   │   ├── CategoryMarkers.jsx
│   │   │   │   └── VoronoiLayer.jsx
│   │   │   └── common/    # Shared components
│   │   │       ├── ToggleControl.jsx
│   │   │       └── CollapsibleSection.jsx
│   │   ├── hooks/         # Custom React hooks
│   │   │   ├── useMapData.js
│   │   │   └── useVoronoi.js
│   │   ├── services/       # API services
│   │   │   └── api.js
│   │   ├── utils/         # Utility functions
│   │   │   ├── icons.js
│   │   │   └── voronoi.js
│   │   └── constants/     # Constants
│   │       └── index.js
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
└── pyproject.toml         # Python dependencies
```

## Scripts

### Converting CSV Files

Convert CSV files from Google Sheets to JSON format:

```bash
python bin/convert_csvs.py
```

Or make it executable and run directly:

```bash
./bin/convert_csvs.py
```

Set the `DOWNLOADS_DIR` environment variable to specify where CSV files are located:

```bash
DOWNLOADS_DIR=/path/to/downloads python bin/convert_csvs.py
```

### Geocoding Museums

Geocode museum addresses to get coordinates:

```bash
python bin/geocode_museums.py
```

Or:

```bash
./bin/geocode_museums.py
```

## API Endpoints

- `GET /` - Serves the React frontend (production) or API info (development)
- `GET /api/health` - Health check endpoint
- `GET /api/boundaries/sf` - Returns San Francisco city boundary as GeoJSON
- `GET /api/stations` - Get all game valid stations
- `GET /api/mountains` - Get all mountains (>400ft)
- `GET /api/dog-parks` - Get all dog parks
- `GET /api/aquariums` - Get all aquariums
- `GET /api/golf-courses` - Get all golf courses
- `GET /api/museums` - Get all museums
- `GET /api/movie-theaters` - Get all movie theaters
- `GET /api/libraries` - Get all libraries
- `GET /api/hospitals` - Get all hospitals
- `GET /api/foreign-consulates` - Get all foreign consulates
- `GET /api/farmers-markets` - Get all farmers markets

## Testing

### Backend Tests

1. Install test dependencies:
```bash
uv sync --extra test
# or
pip install -e ".[test]"
```

2. Run tests:
```bash
pytest
```

3. Run with coverage:
```bash
pytest --cov=main --cov-report=html
```

### Frontend Tests

1. Install dependencies (if not already installed):
```bash
cd frontend
npm install
```

2. Run tests:
```bash
npm test
```

3. Run tests in watch mode:
```bash
npm test -- --watch
```

4. Run tests with UI:
```bash
npm run test:ui
```

5. Run tests with coverage:
```bash
npm run test:coverage
```

