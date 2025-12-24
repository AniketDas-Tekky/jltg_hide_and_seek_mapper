/**
 * Icon creation utilities for Leaflet markers
 */
import L from 'leaflet'

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

/**
 * Create triangle icon for mountains
 */
export const createTriangleIcon = (color = '#8B4513') => {
  return L.divIcon({
    className: 'mountain-icon',
    html: `<svg width="16" height="16" viewBox="0 0 16 16" style="display: block;">
      <path d="M 8 0 L 16 16 L 0 16 Z" fill="${color}" stroke="#654321" stroke-width="1"/>
      <path d="M 8 4 L 12 12 L 4 12 Z" fill="${color}" opacity="0.7"/>
    </svg>`,
    iconSize: [16, 16],
    iconAnchor: [8, 16],
    popupAnchor: [0, -16]
  })
}

/**
 * Create paw print icon for dog parks
 */
export const createPawIcon = (color = '#228B22') => {
  return L.divIcon({
    className: 'dog-park-icon',
    html: `<svg width="20" height="20" viewBox="0 0 20 20" style="display: block;">
      <circle cx="7" cy="7" r="2.5" fill="${color}"/>
      <circle cx="13" cy="7" r="2.5" fill="${color}"/>
      <circle cx="10" cy="12" r="2.5" fill="${color}"/>
      <ellipse cx="6" cy="4" rx="1.5" ry="2" fill="${color}"/>
      <ellipse cx="14" cy="4" rx="1.5" ry="2" fill="${color}"/>
    </svg>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  })
}

/**
 * Create fish icon for aquariums
 */
export const createFishIcon = (color = '#1E90FF') => {
  return L.divIcon({
    className: 'aquarium-icon',
    html: `<svg width="18" height="18" viewBox="0 0 18 18" style="display: block;">
      <ellipse cx="9" cy="9" rx="6" ry="3" fill="${color}"/>
      <path d="M 3 9 L 1 7 L 1 11 Z" fill="${color}"/>
      <circle cx="11" cy="8" r="1" fill="white"/>
    </svg>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -9]
  })
}

/**
 * Create golf ball icon for golf courses
 */
export const createGolfIcon = (color = '#2E8B57') => {
  return L.divIcon({
    className: 'golf-icon',
    html: `<svg width="16" height="16" viewBox="0 0 16 16" style="display: block;">
      <circle cx="8" cy="8" r="7" fill="${color}" stroke="#1a5a3a" stroke-width="1"/>
      <circle cx="8" cy="8" r="5" fill="none" stroke="white" stroke-width="0.5" opacity="0.6"/>
      <circle cx="6" cy="6" r="0.8" fill="white"/>
      <circle cx="10" cy="6" r="0.8" fill="white"/>
      <circle cx="8" cy="10" r="0.8" fill="white"/>
    </svg>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8]
  })
}

/**
 * Create building icon for museums
 */
export const createMuseumIcon = (color = '#9370DB') => {
  return L.divIcon({
    className: 'museum-icon',
    html: `<svg width="20" height="20" viewBox="0 0 20 20" style="display: block;">
      <rect x="4" y="6" width="12" height="12" fill="${color}" stroke="#000" stroke-width="1"/>
      <polygon points="2 6 10 2 18 6" fill="${color}" stroke="#000" stroke-width="1"/>
      <rect x="7" y="9" width="2" height="6" fill="#fff"/>
      <rect x="11" y="9" width="2" height="6" fill="#fff"/>
    </svg>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  })
}

/**
 * Create film icon for movie theaters
 */
export const createMovieIcon = (color = '#DC143C') => {
  return L.divIcon({
    className: 'movie-icon',
    html: `<svg width="20" height="20" viewBox="0 0 20 20" style="display: block;">
      <rect x="2" y="4" width="16" height="12" rx="2" ry="2" fill="${color}" stroke="#000" stroke-width="1"/>
      <circle cx="5" cy="7" r="1" fill="#fff"/>
      <circle cx="5" cy="13" r="1" fill="#fff"/>
      <circle cx="15" cy="7" r="1" fill="#fff"/>
      <circle cx="15" cy="13" r="1" fill="#fff"/>
      <rect x="7" y="8" width="6" height="4" fill="#fff"/>
    </svg>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  })
}

/**
 * Create book icon for libraries
 */
export const createLibraryIcon = (color = '#FF8C00') => {
  return L.divIcon({
    className: 'library-icon',
    html: `<svg width="20" height="20" viewBox="0 0 20 20" style="display: block;">
      <rect x="4" y="4" width="12" height="12" rx="1" ry="1" fill="${color}" stroke="#000" stroke-width="1"/>
      <line x1="7" y1="4" x2="7" y2="16" stroke="#000" stroke-width="1"/>
      <line x1="13" y1="4" x2="13" y2="16" stroke="#000" stroke-width="1"/>
      <rect x="4" y="2" width="12" height="2" fill="${color}" stroke="#000" stroke-width="1"/>
    </svg>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  })
}

/**
 * Create medical cross icon for hospitals
 */
export const createHospitalIcon = (color = '#FF0000') => {
  return L.divIcon({
    className: 'hospital-icon',
    html: `<svg width="20" height="20" viewBox="0 0 20 20" style="display: block;">
      <rect x="8" y="2" width="4" height="16" fill="${color}" stroke="#fff" stroke-width="1"/>
      <rect x="2" y="8" width="16" height="4" fill="${color}" stroke="#fff" stroke-width="1"/>
    </svg>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  })
}

/**
 * Create flag icon for foreign consulates
 */
export const createConsulateIcon = (color = '#FFD700') => {
  return L.divIcon({
    className: 'consulate-icon',
    html: `<svg width="20" height="20" viewBox="0 0 20 20" style="display: block;">
      <path d="M4 2 L4 18 M4 2 L16 2 L16 10 L4 10 Z" fill="${color}" stroke="#000" stroke-width="1"/>
    </svg>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  })
}

/**
 * Create market basket icon for farmers markets
 */
export const createMarketIcon = (color = '#228B22') => {
  return L.divIcon({
    className: 'market-icon',
    html: `<svg width="20" height="20" viewBox="0 0 20 20" style="display: block;">
      <path d="M4 6 L6 16 L14 16 L16 6 Z" fill="${color}" stroke="#000" stroke-width="1"/>
      <path d="M4 6 C5 3 15 3 16 6" fill="none" stroke="#000" stroke-width="1"/>
      <circle cx="7" cy="9" r="1" fill="#fff"/>
      <circle cx="13" cy="9" r="1" fill="#fff"/>
    </svg>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  })
}

