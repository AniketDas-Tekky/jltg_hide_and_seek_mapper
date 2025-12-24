"""
Application configuration.
"""
from pathlib import Path


def get_project_root() -> Path:
    """Get the project root directory."""
    return Path(__file__).parent.parent.parent


def get_data_dir() -> Path:
    """Get the data directory path."""
    return get_project_root() / "data"

