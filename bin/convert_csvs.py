#!/usr/bin/env python3
"""
Convert CSV files from Google Sheets to JSON format.
Handles multiple categories: aquariums, golf courses, museums, movie theaters,
libraries, hospitals, foreign consulates, and farmers markets.
"""
import sys
import os
from pathlib import Path

# Add parent directory to path to import src modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from src.services.csv_service import convert_csv_to_json

# Define categories and their CSV file names
CATEGORIES = {
    'aquariums': 'JLH&S Sheets_ San Francisco - Aquariums.csv',
    'golf_courses': 'JLH&S Sheets_ San Francisco - Golf Courses.csv',
    'museums': 'JLH&S Sheets_ San Francisco - Museums.csv',
    'movie_theaters': 'JLH&S Sheets_ San Francisco - Movie Theaters.csv',
    'libraries': 'JLH&S Sheets_ San Francisco - Libraries.csv',
    'hospitals': 'JLH&S Sheets_ San Francisco - Hospitals.csv',
    'foreign_consulates': 'JLH&S Sheets_ San Francisco - Foreign Consulates.csv',
    'farmers_markets': 'JLH&S Sheets_ San Francisco - Farmers Markets.csv',
}


def main():
    """Main function to convert all CSV files."""
    downloads_dir = os.environ.get('DOWNLOADS_DIR', '/Users/adas/Downloads')
    data_dir = Path(__file__).parent.parent / 'data'
    
    print("Converting CSV files to JSON...")
    print("=" * 50)
    
    success_count = 0
    for category, csv_filename in CATEGORIES.items():
        csv_path = os.path.join(downloads_dir, csv_filename)
        output_filename = f"{category}.json"
        output_path = data_dir / output_filename
        
        try:
            count = convert_csv_to_json(csv_path, str(output_path))
            print(f"✓ Converted {count} items from {csv_filename} to {output_filename}")
            success_count += 1
        except FileNotFoundError:
            print(f"⚠ Warning: {csv_path} not found. Skipping...")
        except Exception as e:
            print(f"✗ Error converting {csv_filename}: {e}")
    
    print("=" * 50)
    print(f"Conversion complete! ({success_count}/{len(CATEGORIES)} files processed)")


if __name__ == '__main__':
    main()

