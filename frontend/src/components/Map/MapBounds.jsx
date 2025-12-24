/**
 * MapBounds component - sets maxBounds on the map after initialization
 * This ensures bounds restrictions work properly
 */
import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'

export default function MapBounds({ bounds }) {
  const map = useMap()
  const boundsSetRef = useRef(false)

  useEffect(() => {
    if (!map || !bounds || boundsSetRef.current) return

    // Set maxBounds on the map instance
    try {
      // Convert bounds array to Leaflet LatLngBounds
      const L = window.L
      if (L && bounds.length === 2) {
        const [[south, west], [north, east]] = bounds
        
        // Validate bounds
        if (isNaN(south) || isNaN(west) || isNaN(north) || isNaN(east)) {
          console.error('Invalid bounds values:', bounds)
          return
        }

        const maxBounds = L.latLngBounds(
          [south, west],
          [north, east]
        )
        
        // Set maxBounds with strict viscosity (1.0 = hard limit)
        map.setMaxBounds(maxBounds)
        
        // Update map options to ensure viscosity is set
        if (map.options) {
          map.options.maxBoundsViscosity = 1.0
        }
        
        // Also set it directly on the map instance
        if (map._maxBoundsViscosity !== undefined) {
          map._maxBoundsViscosity = 1.0
        }

        boundsSetRef.current = true
        
        // Ensure current view is within bounds
        const currentCenter = map.getCenter()
        if (!maxBounds.contains(currentCenter)) {
          const boundedLat = Math.max(south, Math.min(north, currentCenter.lat))
          const boundedLng = Math.max(west, Math.min(east, currentCenter.lng))
          map.setView([boundedLat, boundedLng], map.getZoom(), { animate: false })
        }
      }
    } catch (error) {
      console.error('Error setting map bounds:', error)
    }
  }, [map, bounds])

  // Update bounds if they change
  useEffect(() => {
    if (!map || !bounds || !boundsSetRef.current) return

    try {
      const L = window.L
      if (L && bounds.length === 2) {
        const [[south, west], [north, east]] = bounds
        const maxBounds = L.latLngBounds([south, west], [north, east])
        map.setMaxBounds(maxBounds)
      }
    } catch (error) {
      console.error('Error updating map bounds:', error)
    }
  }, [map, bounds])

  return null
}

