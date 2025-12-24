"""
Category data endpoints.
"""
from fastapi import APIRouter, HTTPException
from typing import Dict, List

from src.services.data_service import get_category_data

router = APIRouter(prefix="/api", tags=["categories"])


def _get_category_endpoint(category: str, response_key: str):
    """Create a category endpoint handler."""
    async def handler() -> Dict[str, List]:
        try:
            items = get_category_data(category)
            return {response_key: items}
        except FileNotFoundError:
            raise HTTPException(
                status_code=404,
                detail=f"{category.replace('_', ' ').title()} data file not found"
            )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error loading {category}: {str(e)}"
            ) from e
    
    return handler


# Register all category endpoints
router.add_api_route("/stations", _get_category_endpoint("stations", "stations"), methods=["GET"])
router.add_api_route("/mountains", _get_category_endpoint("mountains", "mountains"), methods=["GET"])
router.add_api_route("/dog-parks", _get_category_endpoint("dog_parks", "dog_parks"), methods=["GET"])
router.add_api_route("/aquariums", _get_category_endpoint("aquariums", "aquariums"), methods=["GET"])
router.add_api_route("/golf-courses", _get_category_endpoint("golf_courses", "golf_courses"), methods=["GET"])
router.add_api_route("/museums", _get_category_endpoint("museums", "museums"), methods=["GET"])
router.add_api_route("/movie-theaters", _get_category_endpoint("movie_theaters", "movie_theaters"), methods=["GET"])
router.add_api_route("/libraries", _get_category_endpoint("libraries", "libraries"), methods=["GET"])
router.add_api_route("/hospitals", _get_category_endpoint("hospitals", "hospitals"), methods=["GET"])
router.add_api_route("/foreign-consulates", _get_category_endpoint("foreign_consulates", "foreign_consulates"), methods=["GET"])
router.add_api_route("/farmers-markets", _get_category_endpoint("farmers_markets", "farmers_markets"), methods=["GET"])

