"""
CSV conversion services.
"""
import csv
import json
import os
from pathlib import Path
from typing import List, Dict, Optional, Tuple


def parse_coordinates(row: Dict[str, str]) -> Tuple[Optional[float], Optional[float]]:
    """
    Parse latitude and longitude from a CSV row.
    
    Args:
        row: Dictionary representing a CSV row
    
    Returns:
        Tuple of (latitude, longitude) or (None, None) if invalid
    """
    try:
        lat = float(row['latitude']) if row.get('latitude') else None
        lon = float(row['longitude']) if row.get('longitude') else None
        return lat, lon
    except (ValueError, KeyError):
        return None, None


def convert_csv_to_json(
    csv_path: str,
    output_path: str,
    required_fields: List[str] = None,
    optional_fields: List[str] = None
) -> int:
    """
    Convert a CSV file to JSON format.
    
    Args:
        csv_path: Path to input CSV file
        output_path: Path to output JSON file
        required_fields: List of required field names (default: ['objectID', 'name'])
        optional_fields: List of optional field names to include
    
    Returns:
        Number of items successfully converted
    
    Raises:
        FileNotFoundError: If CSV file doesn't exist
        RuntimeError: If conversion fails
    """
    if required_fields is None:
        required_fields = ['objectID', 'name']
    
    if optional_fields is None:
        optional_fields = ['gmaps_link', 'height', 'maps_link', 'notes', 'address']
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"CSV file not found: {csv_path}")
    
    items = []
    try:
        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # Check required fields
                if not all(row.get(field) for field in required_fields):
                    continue
                
                # Parse coordinates
                lat, lon = parse_coordinates(row)
                
                # Only add items with valid coordinates
                if lat is not None and lon is not None:
                    item = {
                        field: row.get(field, '') for field in required_fields
                    }
                    item['latitude'] = lat
                    item['longitude'] = lon
                    
                    # Add optional fields if they exist
                    for field in optional_fields:
                        if field in row and row[field]:
                            item[field] = row[field]
                    
                    items.append(item)
        
        # Save as JSON
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(items, f, indent=2, ensure_ascii=False)
        
        return len(items)
    except Exception as e:
        raise RuntimeError(f"Error converting CSV: {e}") from e

