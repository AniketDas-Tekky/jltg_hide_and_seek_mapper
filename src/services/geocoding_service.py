"""
Geocoding services for converting addresses to coordinates.
"""
import urllib.request
import urllib.parse
import json
import osmnx as ox
from typing import Optional, Dict


def geocode_with_census(address: str, city: str = "San Francisco", state: str = "CA") -> Optional[Dict[str, float]]:
    """
    Geocode using US Census Bureau API (free, no SSL issues).
    
    Args:
        address: Address string to geocode
        city: City name (default: San Francisco)
        state: State abbreviation (default: CA)
    
    Returns:
        dict with 'lat' and 'lon' keys, or None if geocoding fails
    """
    try:
        base_url = 'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress'
        params = {
            'address': f'{address}, {city}, {state}',
            'benchmark': 'Public_AR_Current',
            'format': 'json'
        }
        url = f'{base_url}?{urllib.parse.urlencode(params)}'
        
        req = urllib.request.Request(url, headers={'User-Agent': 'sf_mapper'})
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode())
            if data.get('result') and data['result'].get('addressMatches'):
                match = data['result']['addressMatches'][0]
                coords = match['coordinates']
                return {
                    'lat': float(coords['y']),
                    'lon': float(coords['x'])
                }
    except Exception:
        pass
    return None


def geocode_with_osmnx(query: str, city: str = "San Francisco", state: str = "CA") -> Optional[Dict[str, float]]:
    """
    Geocode using osmnx.
    
    Args:
        query: Query string to geocode
        city: City name (default: San Francisco)
        state: State abbreviation (default: CA)
    
    Returns:
        dict with 'lat' and 'lon' keys, or None if geocoding fails
    """
    try:
        point = ox.geocode(f'{query}, {city}, {state}')
        if point:
            return {
                'lat': point[0],
                'lon': point[1]
            }
    except Exception:
        pass
    return None


def geocode_address(address: str, city: str = "San Francisco", state: str = "CA", prefer_census: bool = True) -> Optional[Dict[str, float]]:
    """
    Geocode an address using available services.
    
    Args:
        address: Address string to geocode
        city: City name (default: San Francisco)
        state: State abbreviation (default: CA)
        prefer_census: If True, try Census Bureau first, then osmnx
    
    Returns:
        dict with 'lat' and 'lon' keys, or None if geocoding fails
    """
    if prefer_census:
        result = geocode_with_census(address, city, state)
        if result:
            return result
        return geocode_with_osmnx(address, city, state)
    else:
        result = geocode_with_osmnx(address, city, state)
        if result:
            return result
        return geocode_with_census(address, city, state)

