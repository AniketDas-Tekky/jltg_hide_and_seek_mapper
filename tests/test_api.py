"""
Tests for FastAPI endpoints
"""
import pytest
from fastapi.testclient import TestClient
from shapely.geometry import Point, shape
from main import app

client = TestClient(app)


def test_health_endpoint():
    """Test the health check endpoint"""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_root_endpoint():
    """Test the root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    # Should return either the frontend or a message
    assert "message" in response.json() or response.headers.get("content-type") == "text/html; charset=utf-8"


def test_sf_boundary_endpoint():
    """Test the SF boundary endpoint returns valid GeoJSON"""
    response = client.get("/api/boundaries/sf")
    assert response.status_code == 200
    
    data = response.json()
    
    # Verify it's valid GeoJSON structure
    assert "type" in data
    assert data["type"] == "FeatureCollection"
    assert "features" in data
    assert len(data["features"]) > 0
    
    # Verify first feature structure
    feature = data["features"][0]
    assert "type" in feature
    assert feature["type"] == "Feature"
    assert "geometry" in feature
    assert "properties" in feature
    
    # Verify geometry structure
    geometry = feature["geometry"]
    assert "type" in geometry
    assert geometry["type"] in ["Polygon", "MultiPolygon"]
    assert "coordinates" in geometry


def test_sf_boundary_caching():
    """Test that SF boundary endpoint caches the result"""
    # First request
    response1 = client.get("/api/boundaries/sf")
    assert response1.status_code == 200
    data1 = response1.json()
    
    # Second request should return the same cached data
    response2 = client.get("/api/boundaries/sf")
    assert response2.status_code == 200
    data2 = response2.json()
    
    # Should be the same data (cached)
    assert data1 == data2


def test_sf_boundary_geojson_coordinates():
    """Test that SF boundary contains valid coordinate data"""
    response = client.get("/api/boundaries/sf")
    assert response.status_code == 200
    
    data = response.json()
    feature = data["features"][0]
    geometry = feature["geometry"]
    
    # Verify coordinates exist and are in expected format
    assert "coordinates" in geometry
    coordinates = geometry["coordinates"]
    
    if geometry["type"] == "Polygon":
        # Polygon should have at least one ring
        assert len(coordinates) > 0
        # First ring should have coordinates
        ring = coordinates[0]
        assert len(ring) > 0
        # Each coordinate should be [lon, lat]
        assert len(ring[0]) == 2
        
        # Verify coordinates are in SF area (rough bounds)
        # SF is approximately: lat 37.7-37.8, lon -122.5 to -122.4
        for coord in ring[:10]:  # Check first 10 coordinates
            lon, lat = coord
            assert -123.0 < lon < -122.0  # SF longitude range
            assert 37.0 < lat < 38.0  # SF latitude range
    
    elif geometry["type"] == "MultiPolygon":
        # MultiPolygon should have at least one polygon
        assert len(coordinates) > 0
        polygon = coordinates[0]
        assert len(polygon) > 0
        ring = polygon[0]
        assert len(ring) > 0
        assert len(ring[0]) == 2


def test_sf_boundary_contains_landmarks():
    """Test that SF boundary contains known SF landmarks"""
    response = client.get("/api/boundaries/sf")
    assert response.status_code == 200
    
    data = response.json()
    feature = data["features"][0]
    geometry = feature["geometry"]
    
    # Convert GeoJSON geometry to Shapely shape
    sf_boundary_shape = shape(geometry)
    
    # Define landmarks with their coordinates (lat, lon)
    # Note: GeoJSON uses [lon, lat], but we'll use (lon, lat) for Point
    landmarks = {
        "Coit Tower": Point(-122.4058, 37.8024),  # Telegraph Hill
        "Fisherman's Wharf": Point(-122.4167, 37.8080),  # Pier 39 area
        "Treasure Island": Point(-122.3700, 37.8236),  # Treasure Island
        "Alcatraz": Point(-122.4225, 37.8267),  # Alcatraz Island
        "De Young Museum": Point(-122.4686, 37.7714),  # Golden Gate Park
        "San Francisco Zoo": Point(-122.5036, 37.7329),  # Zoo area
    }
    
    # Check each landmark is within the boundary
    for landmark_name, point in landmarks.items():
        is_inside = sf_boundary_shape.contains(point)
        assert is_inside, (
            f"{landmark_name} (lon: {point.x}, lat: {point.y}) "
            f"is not within the SF boundary"
        )

