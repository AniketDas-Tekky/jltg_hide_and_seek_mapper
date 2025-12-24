"""
Health check endpoints.
"""
from fastapi import APIRouter
from src.models.schemas import HealthResponse

router = APIRouter(prefix="/api", tags=["health"])


@router.get("/health", response_model=HealthResponse)
async def health():
    """Health check endpoint."""
    return {"status": "ok"}

