"""
Main application entry point.
"""
from src.core.app import create_app
from src.views import health, categories, boundaries, geocoding

# Create the FastAPI application
app = create_app()

# Register routers
app.include_router(health.router)
app.include_router(categories.router)
app.include_router(boundaries.router)
app.include_router(geocoding.router)

