/**
 * Utility functions for working with SF boundary data
 */

/**
 * Extract mainland SF boundary coordinates from GeoJSON
 * Excludes Farallon Islands by selecting the polygon containing SF center
 */
export const extractMainlandBoundary = (sfBoundary) => {
  if (!sfBoundary || !sfBoundary.features) return null

  try {
    const feature = sfBoundary.features[0]
    if (!feature || !feature.geometry) return null

    const geometry = feature.geometry
    const SF_CENTER_LON = -122.4194
    const SF_CENTER_LAT = 37.7749

    // Simple point-in-polygon check
    const isPointInPolygon = (point, ring) => {
      const [x, y] = point
      let inside = false
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi, yi] = ring[i]
        const [xj, yj] = ring[j]
        const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
        if (intersect) inside = !inside
      }
      return inside
    }

    if (geometry.type === 'Polygon') {
      // For Polygon, return the exterior ring
      return geometry.coordinates[0].map(coord => [coord[1], coord[0]]) // Convert [lon, lat] to [lat, lon]
    } else if (geometry.type === 'MultiPolygon') {
      // For MultiPolygon, find the polygon containing SF center (mainland)
      const polygons = geometry.coordinates.map(polygon => polygon[0]) // Get exterior rings
      let mainlandPolygon = null

      // First, try to find polygon containing SF center
      for (const ring of polygons) {
        if (isPointInPolygon([SF_CENTER_LON, SF_CENTER_LAT], ring)) {
          mainlandPolygon = ring
          break
        }
      }

      // If not found, use the largest polygon (mainland is much larger than Farallons)
      if (!mainlandPolygon) {
        mainlandPolygon = polygons.reduce((largest, ring) => {
          const currentArea = ring.length
          const largestArea = largest ? largest.length : 0
          return currentArea > largestArea ? ring : largest
        }, null)
      }

      // Convert to [lat, lon] format
      return mainlandPolygon ? mainlandPolygon.map(coord => [coord[1], coord[0]]) : null
    }
  } catch (error) {
    console.error('Error extracting mainland boundary:', error)
  }
  return null
}

/**
 * Calculate bounding box from boundary coordinates
 * Returns [[south, west], [north, east]] in [lat, lon] format
 */
export const calculateBoundsFromBoundary = (boundaryCoords) => {
  if (!boundaryCoords || boundaryCoords.length === 0) return null

  let minLat = Infinity
  let maxLat = -Infinity
  let minLon = Infinity
  let maxLon = -Infinity

  boundaryCoords.forEach(([lat, lon]) => {
    minLat = Math.min(minLat, lat)
    maxLat = Math.max(maxLat, lat)
    minLon = Math.min(minLon, lon)
    maxLon = Math.max(maxLon, lon)
  })

  // Add padding to allow panning
  // More padding on the south side to allow zooming in on the south border
  const latRange = maxLat - minLat
  const lonRange = maxLon - minLon
  
  // Standard padding for north, east, west (2%)
  const standardPadding = 0.02
  const northPadding = latRange * standardPadding
  const eastPadding = lonRange * standardPadding
  const westPadding = lonRange * standardPadding
  
  // Extra padding on the south side (10% of lat range) to allow centering on south border
  const southPadding = latRange * 0.10

  return [
    [minLat - southPadding, minLon - westPadding], // Southwest (more south padding)
    [maxLat + northPadding, maxLon + eastPadding]  // Northeast
  ]
}

/**
 * Calculate center point from boundary coordinates
 */
export const calculateCenterFromBoundary = (boundaryCoords) => {
  if (!boundaryCoords || boundaryCoords.length === 0) return null

  let sumLat = 0
  let sumLon = 0

  boundaryCoords.forEach(([lat, lon]) => {
    sumLat += lat
    sumLon += lon
  })

  return [sumLat / boundaryCoords.length, sumLon / boundaryCoords.length]
}

