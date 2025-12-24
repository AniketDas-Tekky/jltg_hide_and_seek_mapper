"""
Pydantic schemas for request/response validation.
"""
from typing import List, Optional
from pydantic import BaseModel


class LocationItem(BaseModel):
    """Base model for location-based items."""
    objectID: str
    name: str
    latitude: float
    longitude: float
    address: Optional[str] = None
    notes: Optional[str] = None


class Station(LocationItem):
    """Station model."""
    primary_system: Optional[str] = None
    associated_lines: Optional[str] = None


class Mountain(LocationItem):
    """Mountain model."""
    height: Optional[str] = None


class CategoryResponse(BaseModel):
    """Generic category response model."""
    items: List[LocationItem]


class GeocodeResponse(BaseModel):
    """Geocoding response model."""
    latitude: float
    longitude: float


class HealthResponse(BaseModel):
    """Health check response model."""
    status: str

