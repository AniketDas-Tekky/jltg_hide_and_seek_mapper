"""
Geographic boundary endpoints.
"""
from fastapi import APIRouter, HTTPException
from typing import Dict

from src.services.boundary_service import get_sf_boundary

router = APIRouter(prefix="/api/boundaries", tags=["boundaries"])


@router.get("/sf")
async def get_sf_boundary_endpoint() -> Dict:
    """
    Get San Francisco city boundary as GeoJSON.
    Cached to avoid repeated calls to OpenStreetMap API.
    """
    try:
        return await get_sf_boundary()
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch SF boundary: {str(e)}"
        ) from e

