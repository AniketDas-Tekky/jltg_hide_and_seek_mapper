"""
FastAPI application setup and configuration.
"""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from .config import get_project_root


def create_app() -> FastAPI:
    """
    Create and configure the FastAPI application.
    
    Returns:
        Configured FastAPI application instance
    """
    app = FastAPI(
        title="SF Hide and Seek Mapper",
        description="Interactive map application for San Francisco",
        version="1.0.0"
    )
    
    # Enable CORS for development
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173", "http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Serve static files in production (after React build)
    project_root = get_project_root()
    static_dir = project_root / "frontend" / "dist"
    
    if static_dir.exists():
        app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")
        
        @app.get("/")
        async def serve_frontend():
            index_path = static_dir / "index.html"
            if index_path.exists():
                return FileResponse(str(index_path))
            return {"message": "Frontend not built. Run 'npm run build' in frontend directory."}
    else:
        @app.get("/")
        async def root():
            return {
                "message": "FastAPI backend is running. Start the React dev server with 'npm run dev' in the frontend directory."
            }
    
    return app

