"""
Data loading and management services.
"""
import json
from pathlib import Path
from typing import List, Dict

from ..core.config import get_data_dir


def load_json_data(filename: str) -> List[Dict]:
    """
    Load data from a JSON file in the data directory.
    
    Args:
        filename: Name of the JSON file (e.g., 'stations.json')
    
    Returns:
        List of data items from the JSON file
    
    Raises:
        FileNotFoundError: If the file doesn't exist
        json.JSONDecodeError: If the file is not valid JSON
    """
    data_path = get_data_dir() / filename
    
    if not data_path.exists():
        raise FileNotFoundError(f"Data file not found: {data_path}")
    
    with open(data_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_json_data(filename: str, data: List[Dict]) -> None:
    """
    Save data to a JSON file in the data directory.
    
    Args:
        filename: Name of the JSON file (e.g., 'stations.json')
        data: List of dictionaries to save
    """
    data_path = get_data_dir() / filename
    
    # Ensure data directory exists
    data_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(data_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def get_category_data(category: str) -> List[Dict]:
    """
    Get category data from JSON file.
    
    Args:
        category: Category name (e.g., 'stations', 'mountains')
    
    Returns:
        List of data items
    
    Raises:
        FileNotFoundError: If file not found
    """
    filename = f"{category}.json"
    return load_json_data(filename)

