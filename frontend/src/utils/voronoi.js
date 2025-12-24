/**
 * Voronoi diagram calculation utilities
 */
import { voronoi } from 'd3-voronoi'
import { SF_BOUNDS } from '../constants'

/**
 * Calculate Voronoi diagram for a set of points
 * @param {Array} items - Array of items with latitude and longitude
 * @param {boolean} showVoronoiFlag - Whether to show Voronoi
 * @param {boolean} showItemsFlag - Whether items are shown
 * @param {Array} extent - Bounding box for Voronoi calculation [min, max]
 * @returns {Array} Array of Voronoi cell objects with id and coordinates
 */
export const calculateVoronoi = (items, showVoronoiFlag, showItemsFlag, extent = SF_BOUNDS) => {
  if (!showVoronoiFlag || !showItemsFlag || items.length === 0) return []

  try {
    const points = items.map(item => [item.longitude, item.latitude])
    const voronoiDiagram = voronoi()
      .extent(extent)
      .x(d => d[0])
      .y(d => d[1])
    
    const diagram = voronoiDiagram(points)
    
    return diagram.polygons().map((polygon, i) => {
      if (!polygon) return null
      // Convert from [lon, lat] to [lat, lon] for Leaflet
      const coords = polygon.map(coord => [coord[1], coord[0]])
      return {
        id: items[i]?.objectID || i,
        coordinates: coords
      }
    }).filter(cell => cell !== null)
  } catch (error) {
    console.error('Error calculating Voronoi diagram:', error)
    return []
  }
}

