/**
 * Map component - main map display with all features
 */
import React, { useState, useMemo } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { SF_CENTER, CATEGORY_COLORS, MIN_ZOOM, MAX_ZOOM } from '../../constants'
import { useSFBoundary, useAllCategoryData } from '../../hooks/useMapData'
import { useVoronoi } from '../../hooks/useVoronoi'
import { extractMainlandBoundary, calculateBoundsFromBoundary, calculateCenterFromBoundary } from '../../utils/boundaryUtils'
import * as icons from '../../utils/icons'
import GreyOverlay from './GreyOverlay'
import MapBounds from './MapBounds'
import MapControls from './MapControls'
import { StationMarkers, MountainMarkers, CategoryMarkers } from './CategoryMarkers'
import VoronoiLayer from './VoronoiLayer'
import './Map.css'

function Map() {
  // Fetch data
  const { boundary: sfBoundary, loading, error } = useSFBoundary()
  const {
    stations,
    mountains,
    dogParks,
    aquariums,
    golfCourses,
    museums,
    movieTheaters,
    libraries,
    hospitals,
    foreignConsulates,
    farmersMarkets,
  } = useAllCategoryData()

  // Toggle states
  const [showStations, setShowStations] = useState(false)
  const [showRadius, setShowRadius] = useState(false)
  const [showMountains, setShowMountains] = useState(false)
  const [showVoronoi, setShowVoronoi] = useState(false)
  const [showDogParks, setShowDogParks] = useState(false)
  const [showDogParkVoronoi, setShowDogParkVoronoi] = useState(false)
  const [showAquariums, setShowAquariums] = useState(false)
  const [showAquariumVoronoi, setShowAquariumVoronoi] = useState(false)
  const [showGolfCourses, setShowGolfCourses] = useState(false)
  const [showGolfVoronoi, setShowGolfVoronoi] = useState(false)
  const [showMuseums, setShowMuseums] = useState(false)
  const [showMuseumVoronoi, setShowMuseumVoronoi] = useState(false)
  const [showMovieTheaters, setShowMovieTheaters] = useState(false)
  const [showMovieVoronoi, setShowMovieVoronoi] = useState(false)
  const [showLibraries, setShowLibraries] = useState(false)
  const [showLibraryVoronoi, setShowLibraryVoronoi] = useState(false)
  const [showHospitals, setShowHospitals] = useState(false)
  const [showHospitalVoronoi, setShowHospitalVoronoi] = useState(false)
  const [showForeignConsulates, setShowForeignConsulates] = useState(false)
  const [showConsulateVoronoi, setShowConsulateVoronoi] = useState(false)
  const [showFarmersMarkets, setShowFarmersMarkets] = useState(false)
  const [showMarketVoronoi, setShowMarketVoronoi] = useState(false)

  // Calculate Voronoi diagrams
  const mountainVoronoiCells = useVoronoi(mountains, showVoronoi, showMountains)
  const dogParkVoronoiCells = useVoronoi(dogParks, showDogParkVoronoi, showDogParks)
  const aquariumVoronoiCells = useVoronoi(aquariums, showAquariumVoronoi, showAquariums)
  const golfVoronoiCells = useVoronoi(golfCourses, showGolfVoronoi, showGolfCourses)
  const museumVoronoiCells = useVoronoi(museums, showMuseumVoronoi, showMuseums)
  const movieVoronoiCells = useVoronoi(movieTheaters, showMovieVoronoi, showMovieTheaters)
  const libraryVoronoiCells = useVoronoi(libraries, showLibraryVoronoi, showLibraries)
  const hospitalVoronoiCells = useVoronoi(hospitals, showHospitalVoronoi, showHospitals)
  const consulateVoronoiCells = useVoronoi(foreignConsulates, showConsulateVoronoi, showForeignConsulates)
  const marketVoronoiCells = useVoronoi(farmersMarkets, showMarketVoronoi, showFarmersMarkets)

  // Calculate mainland SF boundary and bounds
  const mainlandBoundary = useMemo(() => {
    if (!sfBoundary) return null
    return extractMainlandBoundary(sfBoundary)
  }, [sfBoundary])

  // Calculate map bounds from mainland boundary
  const mapBounds = useMemo(() => {
    if (!mainlandBoundary) return null
    const bounds = calculateBoundsFromBoundary(mainlandBoundary)
    // Debug: log bounds to verify they're calculated correctly
    if (bounds) {
      console.log('Map bounds calculated:', bounds)
    }
    return bounds
  }, [mainlandBoundary])

  // Calculate center from mainland boundary, fallback to SF_CENTER
  const mapCenter = useMemo(() => {
    if (!mainlandBoundary) return SF_CENTER
    const calculatedCenter = calculateCenterFromBoundary(mainlandBoundary)
    return calculatedCenter || SF_CENTER
  }, [mainlandBoundary])

  // Style function for SF boundary
  const boundaryStyle = {
    fillColor: 'transparent',
    fillOpacity: 0,
    color: '#0066cc',
    weight: 3,
    opacity: 0.8
  }

  return (
    <div className="map-container">
      {loading && (
        <div className="map-loading">Loading map...</div>
      )}
      {error && (
        <div className="map-error">Error: {error}</div>
      )}
      <MapControls
        showStations={showStations}
        setShowStations={setShowStations}
        showRadius={showRadius}
        setShowRadius={setShowRadius}
        showMountains={showMountains}
        setShowMountains={setShowMountains}
        showVoronoi={showVoronoi}
        setShowVoronoi={setShowVoronoi}
        showDogParks={showDogParks}
        setShowDogParks={setShowDogParks}
        showDogParkVoronoi={showDogParkVoronoi}
        setShowDogParkVoronoi={setShowDogParkVoronoi}
        showAquariums={showAquariums}
        setShowAquariums={setShowAquariums}
        showAquariumVoronoi={showAquariumVoronoi}
        setShowAquariumVoronoi={setShowAquariumVoronoi}
        showGolfCourses={showGolfCourses}
        setShowGolfCourses={setShowGolfCourses}
        showGolfVoronoi={showGolfVoronoi}
        setShowGolfVoronoi={setShowGolfVoronoi}
        showMuseums={showMuseums}
        setShowMuseums={setShowMuseums}
        showMuseumVoronoi={showMuseumVoronoi}
        setShowMuseumVoronoi={setShowMuseumVoronoi}
        showMovieTheaters={showMovieTheaters}
        setShowMovieTheaters={setShowMovieTheaters}
        showMovieVoronoi={showMovieVoronoi}
        setShowMovieVoronoi={setShowMovieVoronoi}
        showLibraries={showLibraries}
        setShowLibraries={setShowLibraries}
        showLibraryVoronoi={showLibraryVoronoi}
        setShowLibraryVoronoi={setShowLibraryVoronoi}
        showHospitals={showHospitals}
        setShowHospitals={setShowHospitals}
        showHospitalVoronoi={showHospitalVoronoi}
        setShowHospitalVoronoi={setShowHospitalVoronoi}
        showForeignConsulates={showForeignConsulates}
        setShowForeignConsulates={setShowForeignConsulates}
        showConsulateVoronoi={showConsulateVoronoi}
        setShowConsulateVoronoi={setShowConsulateVoronoi}
        showFarmersMarkets={showFarmersMarkets}
        setShowFarmersMarkets={setShowFarmersMarkets}
        showMarketVoronoi={showMarketVoronoi}
        setShowMarketVoronoi={setShowMarketVoronoi}
      />
      <MapContainer
        center={mapCenter}
        zoom={13}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        scrollWheelZoom={true}
        touchZoom={true}
        doubleClickZoom={true}
        zoomControl={true}
        dragging={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapBounds && <MapBounds bounds={mapBounds} />}
        <GreyOverlay sfBoundary={sfBoundary} />
        {sfBoundary && (
          <GeoJSON
            data={sfBoundary}
            style={boundaryStyle}
          />
        )}
        
        {/* Stations */}
        {showStations && <StationMarkers stations={stations} showRadius={showRadius} />}
        
        {/* Mountains */}
        <VoronoiLayer 
          cells={mountainVoronoiCells} 
          color={CATEGORY_COLORS.mountains} 
          show={showVoronoi} 
        />
        {showMountains && <MountainMarkers mountains={mountains} />}
        
        {/* Dog Parks */}
        <VoronoiLayer 
          cells={dogParkVoronoiCells} 
          color={CATEGORY_COLORS.dogParks} 
          show={showDogParkVoronoi} 
        />
        <CategoryMarkers 
          items={dogParks} 
          iconCreator={icons.createPawIcon} 
          color={CATEGORY_COLORS.dogParks}
          show={showDogParks}
        />
        
        {/* Aquariums */}
        <VoronoiLayer 
          cells={aquariumVoronoiCells} 
          color={CATEGORY_COLORS.aquariums} 
          show={showAquariumVoronoi} 
        />
        <CategoryMarkers 
          items={aquariums} 
          iconCreator={icons.createFishIcon} 
          color={CATEGORY_COLORS.aquariums}
          show={showAquariums}
        />
        
        {/* Golf Courses */}
        <VoronoiLayer 
          cells={golfVoronoiCells} 
          color={CATEGORY_COLORS.golfCourses} 
          show={showGolfVoronoi} 
        />
        <CategoryMarkers 
          items={golfCourses} 
          iconCreator={icons.createGolfIcon} 
          color={CATEGORY_COLORS.golfCourses}
          show={showGolfCourses}
        />
        
        {/* Museums */}
        <VoronoiLayer 
          cells={museumVoronoiCells} 
          color={CATEGORY_COLORS.museums} 
          show={showMuseumVoronoi} 
        />
        <CategoryMarkers 
          items={museums} 
          iconCreator={icons.createMuseumIcon} 
          color={CATEGORY_COLORS.museums}
          show={showMuseums}
        />
        
        {/* Movie Theaters */}
        <VoronoiLayer 
          cells={movieVoronoiCells} 
          color={CATEGORY_COLORS.movieTheaters} 
          show={showMovieVoronoi} 
        />
        <CategoryMarkers 
          items={movieTheaters} 
          iconCreator={icons.createMovieIcon} 
          color={CATEGORY_COLORS.movieTheaters}
          show={showMovieTheaters}
        />
        
        {/* Libraries */}
        <VoronoiLayer 
          cells={libraryVoronoiCells} 
          color={CATEGORY_COLORS.libraries} 
          show={showLibraryVoronoi} 
        />
        <CategoryMarkers 
          items={libraries} 
          iconCreator={icons.createLibraryIcon} 
          color={CATEGORY_COLORS.libraries}
          show={showLibraries}
        />
        
        {/* Hospitals */}
        <VoronoiLayer 
          cells={hospitalVoronoiCells} 
          color={CATEGORY_COLORS.hospitals} 
          show={showHospitalVoronoi} 
        />
        <CategoryMarkers 
          items={hospitals} 
          iconCreator={icons.createHospitalIcon} 
          color={CATEGORY_COLORS.hospitals}
          show={showHospitals}
        />
        
        {/* Foreign Consulates */}
        <VoronoiLayer 
          cells={consulateVoronoiCells} 
          color={CATEGORY_COLORS.foreignConsulates} 
          show={showConsulateVoronoi} 
        />
        <CategoryMarkers 
          items={foreignConsulates} 
          iconCreator={icons.createConsulateIcon} 
          color={CATEGORY_COLORS.foreignConsulates}
          show={showForeignConsulates}
        />
        
        {/* Farmers Markets */}
        <VoronoiLayer 
          cells={marketVoronoiCells} 
          color={CATEGORY_COLORS.farmersMarkets} 
          show={showMarketVoronoi} 
        />
        <CategoryMarkers 
          items={farmersMarkets} 
          iconCreator={icons.createMarketIcon} 
          color={CATEGORY_COLORS.farmersMarkets}
          show={showFarmersMarkets}
        />
      </MapContainer>
    </div>
  )
}

export default Map

