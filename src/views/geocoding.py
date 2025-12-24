"""
Geocoding endpoints.
"""
import asyncio
from fastapi import APIRouter, HTTPException
from concurrent.futures import ThreadPoolExecutor
from geopy.geocoders import Nominatim

from src.models.schemas import GeocodeResponse

router = APIRouter(prefix="/api", tags=["geocoding"])

_executor = ThreadPoolExecutor(max_workers=1)


def _geocode_address_blocking(address: str) -> dict:
    """Blocking geocoding function - runs in thread pool."""
    try:
        geolocator = Nominatim(user_agent='sf_museum_mapper')
        location = geolocator.geocode(f'{address}, San Francisco, CA', timeout=10)
        if location:
            return {"latitude": location.latitude, "longitude": location.longitude}
        return None
    except Exception as e:
        print(f"Geocoding error for {address}: {e}")
        return None


@router.post("/geocode", response_model=GeocodeResponse)
async def geocode_address(address: str):
    """
    Geocode an address to get latitude and longitude.
    """
    try:
        loop = asyncio.get_event_loop()
        result = await loop.run_in_executor(
            _executor, _geocode_address_blocking, address
        )
        if result:
            return result
        else:
            raise HTTPException(status_code=404, detail="Address not found")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Geocoding failed: {str(e)}") from e

