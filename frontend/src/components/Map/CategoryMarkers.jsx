/**
 * CategoryMarkers component - renders markers for a category
 */
import React from 'react'
import { Marker, Popup, Tooltip, CircleMarker, Circle } from 'react-leaflet'
import { QUARTER_MILE_RADIUS, CATEGORY_COLORS } from '../../constants'
import * as icons from '../../utils/icons'

/**
 * Render station markers with optional radius
 */
export function StationMarkers({ stations, showRadius }) {
  if (!stations || stations.length === 0) return null

  return (
    <>
      {stations.map((station) => (
        <React.Fragment key={station.objectID}>
          <CircleMarker
            center={[station.latitude, station.longitude]}
            radius={5}
            pathOptions={{
              fillColor: CATEGORY_COLORS.stations,
              fillOpacity: 1,
              color: '#ffffff',
              weight: 2,
              opacity: 1
            }}
          >
            <Popup>
              <strong>{station.name}</strong>
              {station.primary_system && (
                <>
                  <br />
                  <em>{station.primary_system}</em>
                </>
              )}
              {station.associated_lines && (
                <>
                  <br />
                  Lines: {station.associated_lines}
                </>
              )}
              {station.notes && (
                <>
                  <br />
                  <small>{station.notes}</small>
                </>
              )}
            </Popup>
          </CircleMarker>
          {showRadius && (
            <Circle
              center={[station.latitude, station.longitude]}
              radius={QUARTER_MILE_RADIUS}
              pathOptions={{
                fillColor: CATEGORY_COLORS.stations,
                fillOpacity: 0.2,
                color: CATEGORY_COLORS.stations,
                weight: 2,
                opacity: 0.5
              }}
            />
          )}
        </React.Fragment>
      ))}
    </>
  )
}

/**
 * Render mountain markers with labels
 */
export function MountainMarkers({ mountains }) {
  if (!mountains || mountains.length === 0) return null

  return (
    <>
      {mountains.map((mountain) => (
        <Marker
          key={mountain.objectID}
          position={[mountain.latitude, mountain.longitude]}
          icon={icons.createTriangleIcon(CATEGORY_COLORS.mountains)}
        >
          <Tooltip permanent direction="top" offset={[0, -20]}>
            <span className="mountain-label">{mountain.name}</span>
          </Tooltip>
          <Popup>
            <strong>{mountain.name}</strong>
            {mountain.height && (
              <>
                <br />
                Height: {mountain.height}
              </>
            )}
          </Popup>
        </Marker>
      ))}
    </>
  )
}

/**
 * Generic category marker renderer
 */
export function CategoryMarkers({ 
  items, 
  iconCreator, 
  color,
  show = true 
}) {
  if (!show || !items || items.length === 0) return null

  return (
    <>
      {items.map((item) => (
        <Marker 
          key={item.objectID} 
          position={[item.latitude, item.longitude]} 
          icon={iconCreator(color)}
        >
          <Popup><strong>{item.name}</strong></Popup>
        </Marker>
      ))}
    </>
  )
}

