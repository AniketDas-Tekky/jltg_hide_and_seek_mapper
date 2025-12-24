/**
 * VoronoiLayer component - renders Voronoi diagram polygons
 */
import { Polygon } from 'react-leaflet'
import { CATEGORY_COLORS } from '../../constants'

/**
 * Render Voronoi cells for a category
 */
export default function VoronoiLayer({ cells, color, show = true }) {
  if (!show || !cells || cells.length === 0) return null

  return (
    <>
      {cells.map((cell) => (
        <Polygon
          key={cell.id}
          positions={cell.coordinates}
          pathOptions={{
            fillColor: color,
            fillOpacity: 0.15,
            color: color,
            weight: 1,
            opacity: 0.6
          }}
        />
      ))}
    </>
  )
}

