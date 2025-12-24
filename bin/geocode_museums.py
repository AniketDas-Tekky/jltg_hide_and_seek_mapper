#!/usr/bin/env python3
"""
Geocode museum addresses to get latitude and longitude coordinates.
Uses multiple methods as fallback.
"""
import sys
import os
import time
from pathlib import Path

# Add parent directory to path to import src modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from src.services.geocoding_service import geocode_with_census, geocode_with_osmnx
from src.services.data_service import load_json_data, save_json_data
from src.services.csv_service import parse_coordinates
import csv

# Known museum coordinates (well-known SF museums)
KNOWN_MUSEUMS = {
    'SFMOMA': (37.7857, -122.4011),
    'San Francisco Museum of Modern Art': (37.7857, -122.4011),
    'de Young Museum': (37.7705, -122.4689),
    'California Academy of Sciences': (37.7699, -122.4661),
    'Exploratorium': (37.8017, -122.3976),
    'Asian Art Museum': (37.7803, -122.4161),
    'Legion of Honor': (37.7846, -122.5007),
    'The Contemporary Jewish Museum': (37.7874, -122.4032),
    'The Cable Car Museum': (37.7947, -122.4108),
    'Conservatory of Flowers': (37.7719, -122.4612),
}


def process_museum_row(row, index, total):
    """
    Process a single museum row from CSV.
    
    Args:
        row: Dictionary representing a CSV row
        index: Current row index (1-based)
        total: Total number of rows
    
    Returns:
        Dictionary representing the museum, or None if invalid
    """
    if not row.get('objectID') or not row.get('name'):
        return None
    
    museum = {
        'objectID': row.get('objectID', ''),
        'name': row.get('name', ''),
    }
    
    # Check if coordinates already exist
    lat, lon = parse_coordinates(row)
    
    if lat is not None and lon is not None:
        museum['latitude'] = lat
        museum['longitude'] = lon
        print(f'[{index}/{total}] ✓ {museum["name"]}: Using existing coordinates')
        return museum
    
    # If no coordinates, try geocoding
    museum_name = row.get('name', '').strip()
    found_in_known = False
    
    # First check known museums
    for known_name, coords in KNOWN_MUSEUMS.items():
        if known_name.lower() in museum_name.lower() or museum_name.lower() in known_name.lower():
            museum['latitude'] = coords[0]
            museum['longitude'] = coords[1]
            print(f'[{index}/{total}] ✓ {museum["name"]}: Using known coordinates')
            found_in_known = True
            break
    
    if not found_in_known:
        # Try geocoding with address or name
        address = row.get('address', '').strip()
        maps_link = row.get('maps_link', '').strip()
        
        queries_to_try = []
        if address:
            queries_to_try.append(address)
        if maps_link and maps_link != museum_name:
            queries_to_try.append(maps_link)
        if museum_name:
            queries_to_try.append(museum_name)
        
        found = False
        for query in queries_to_try:
            print(f'[{index}/{total}] Geocoding: {museum["name"]} - trying "{query}"')
            # Try Census Bureau first (more reliable)
            result = geocode_with_census(query)
            if not result:
                # Fallback to osmnx
                result = geocode_with_osmnx(query)
            if result:
                museum['latitude'] = result['lat']
                museum['longitude'] = result['lon']
                print(f'  → Found: ({result["lat"]}, {result["lon"]})')
                time.sleep(0.5)  # Rate limiting
                found = True
                break
        
        if not found:
            print(f'  → No location found, skipping')
            return None
    
    # Add optional fields
    for field in ['gmaps_link', 'maps_link', 'notes', 'address']:
        if field in row and row[field]:
            museum[field] = row[field]
    
    return museum


def main():
    """Main function to geocode museums."""
    downloads_dir = os.environ.get('DOWNLOADS_DIR', '/Users/adas/Downloads')
    csv_path = os.path.join(downloads_dir, 'JLH&S Sheets_ San Francisco - Museums.csv')
    
    if not os.path.exists(csv_path):
        print(f"Error: CSV file not found at {csv_path}")
        print("Set DOWNLOADS_DIR environment variable to specify the downloads directory.")
        sys.exit(1)
    
    museums = []
    
    print('Reading museums CSV...')
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        total = len(rows)
        
        for i, row in enumerate(rows, 1):
            museum = process_museum_row(row, i, total)
            if museum:
                museums.append(museum)
    
    print(f'\nConverted {len(museums)} museums to JSON')
    
    save_json_data('museums.json', museums)
    print(f'Saved to data/museums.json')


if __name__ == '__main__':
    main()

