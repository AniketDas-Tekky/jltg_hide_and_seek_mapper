"""
Service for fetching and caching geographic boundaries.
"""
import osmnx as ox
import json
from typing import Optional, Dict
from concurrent.futures import ThreadPoolExecutor
import asyncio


# Cache for SF boundary to avoid repeated API calls
_sf_boundary_cache: Optional[Dict] = None
_executor = ThreadPoolExecutor(max_workers=1)


def _fetch_sf_boundary() -> Dict:
    """
    Synchronous function to fetch SF boundary - runs in thread pool.
    
    Returns:
        GeoJSON dictionary of San Francisco boundary
    
    Raises:
        Exception: If boundary fetch fails
    """
    try:
        # Get SF boundary using osmnx
        sf_boundary_gdf = ox.geocode_to_gdf("San Francisco, CA, USA")
        
        # Convert to GeoJSON
        geojson_str = sf_boundary_gdf.to_json()
        return json.loads(geojson_str)
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error fetching SF boundary: {e}")
        print(error_details)
        raise


async def get_sf_boundary() -> Dict:
    """
    Get San Francisco city boundary as GeoJSON.
    Cached to avoid repeated calls to OpenStreetMap API.
    
    Returns:
        GeoJSON dictionary of San Francisco boundary
    
    Raises:
        Exception: If boundary fetch fails
    """
    global _sf_boundary_cache
    
    if _sf_boundary_cache is None:
        # Run the blocking osmnx call in a thread pool
        loop = asyncio.get_event_loop()
        _sf_boundary_cache = await loop.run_in_executor(
            _executor, _fetch_sf_boundary
        )
    
    return _sf_boundary_cache

