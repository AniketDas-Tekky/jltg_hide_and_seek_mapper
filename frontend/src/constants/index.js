/**
 * Application constants
 */

// San Francisco coordinates
export const SF_CENTER = [37.7749, -122.4194]

// 1/4 mile in meters
export const QUARTER_MILE_RADIUS = 402.336

// San Francisco approximate bounds for Voronoi calculations (lon, lat)
export const SF_BOUNDS = [[-123.2, 37.6], [-122.3, 37.9]]

// Map zoom limits
// Minimum zoom is set to keep focus on mainland SF
export const MIN_ZOOM = 11  // Prevent zooming out too far (focused on mainland SF)
export const MAX_ZOOM = 18  // Maximum zoom level

// Category colors
export const CATEGORY_COLORS = {
  stations: '#3388ff',
  mountains: '#8B4513',
  dogParks: '#228B22',
  aquariums: '#1E90FF',
  golfCourses: '#2E8B57',
  museums: '#9370DB',
  movieTheaters: '#DC143C',
  libraries: '#FF8C00',
  hospitals: '#FF0000',
  foreignConsulates: '#FFD700',
  farmersMarkets: '#228B22',
}

