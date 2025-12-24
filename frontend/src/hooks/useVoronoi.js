/**
 * Custom hook for Voronoi diagram calculations
 */
import { useMemo } from 'react'
import { calculateVoronoi } from '../utils/voronoi'

/**
 * Hook to calculate Voronoi cells for a category
 */
export const useVoronoi = (items, showVoronoi, showItems) => {
  return useMemo(
    () => calculateVoronoi(items, showVoronoi, showItems),
    [items, showVoronoi, showItems]
  )
}

