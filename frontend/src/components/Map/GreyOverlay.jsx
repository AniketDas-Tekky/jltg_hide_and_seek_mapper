/**
 * GreyOverlay component - creates a grey overlay with SF boundary as a hole
 */
import { useState, useEffect, useMemo } from 'react'
import { Polygon, useMap } from 'react-leaflet'

/**
 * Component to create grey overlay with SF boundary as a hole
 */
export default function GreyOverlay({ sfBoundary }) {
  const map = useMap()
  const [bounds, setBounds] = useState(null)

  useEffect(() => {
    if (!map) return

    const updateBounds = () => {
      try {
        const currentBounds = map.getBounds()
        if (!currentBounds) return

        // Create a large bounding box covering the viewport
        const expandedBounds = [
          [currentBounds.getNorth() + 5, currentBounds.getWest() - 5],
          [currentBounds.getNorth() + 5, currentBounds.getEast() + 5],
          [currentBounds.getSouth() - 5, currentBounds.getEast() + 5],
          [currentBounds.getSouth() - 5, currentBounds.getWest() - 5],
          [currentBounds.getNorth() + 5, currentBounds.getWest() - 5]
        ]
        setBounds(expandedBounds)
      } catch (error) {
        console.error('Error updating bounds:', error)
      }
    }

    // Wait a bit for map to initialize, then set up listeners
    const timer = setTimeout(() => {
      updateBounds()
      map.on('moveend', updateBounds)
      map.on('zoomend', updateBounds)
    }, 100)

    return () => {
      clearTimeout(timer)
      map.off('moveend', updateBounds)
      map.off('zoomend', updateBounds)
    }
  }, [map])

  // Extract SF boundary coordinates from GeoJSON
  // Handle MultiPolygon by filtering to mainland SF (excluding Farallon Islands)
  const sfBoundaryCoords = useMemo(() => {
    if (!sfBoundary || !bounds) return null

    try {
      // Get the first feature's geometry
      const feature = sfBoundary.features?.[0]
      if (!feature || !feature.geometry) return null

      const geometry = feature.geometry
      
      // Handle different geometry types
      if (geometry.type === 'Polygon') {
        // For Polygon, use the first ring (exterior ring)
        // Convert from [lon, lat] to [lat, lon] format
        return [geometry.coordinates[0].map(coord => [coord[1], coord[0]])]
      } else if (geometry.type === 'MultiPolygon') {
        // For MultiPolygon, we need to handle multiple polygons
        // Filter to only include mainland SF (exclude Farallon Islands)
        // Strategy: Use the polygon that contains SF center point (mainland) or the largest polygon
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
        
        // Find polygon containing SF center (mainland) or use largest polygon
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
        
        // Convert to [lat, lon] format and return as array
        return mainlandPolygon 
          ? [mainlandPolygon.map(coord => [coord[1], coord[0]])]
          : polygons.map(ring => ring.map(coord => [coord[1], coord[0]]))
      }
    } catch (error) {
      console.error('Error extracting boundary coordinates:', error)
    }
    return null
  }, [sfBoundary, bounds])

  if (!bounds || !sfBoundaryCoords || sfBoundaryCoords.length === 0) return null

  // Create polygon with holes: outer ring is the expanded bounds, holes are SF boundary parts
  // Leaflet Polygon supports multiple holes - pass all boundary polygons as holes
  const polygonWithHoles = [bounds, ...sfBoundaryCoords]

  return (
    <Polygon
      positions={polygonWithHoles}
      pathOptions={{
        fillColor: '#808080',
        fillOpacity: 0.6,
        color: 'transparent',
        weight: 0
      }}
    />
  )
}

