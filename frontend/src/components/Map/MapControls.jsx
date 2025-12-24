/**
 * MapControls component - control panel with toggles for map features
 */
import { useState, useEffect } from 'react'
import ToggleControl from '../common/ToggleControl'
import CollapsibleSection from '../common/CollapsibleSection'
import { useIsMobile } from '../../utils/responsive'
import './MapControls.css'

export default function MapControls({
  showStations,
  setShowStations,
  showRadius,
  setShowRadius,
  showMountains,
  setShowMountains,
  showVoronoi,
  setShowVoronoi,
  showDogParks,
  setShowDogParks,
  showDogParkVoronoi,
  setShowDogParkVoronoi,
  showAquariums,
  setShowAquariums,
  showAquariumVoronoi,
  setShowAquariumVoronoi,
  showGolfCourses,
  setShowGolfCourses,
  showGolfVoronoi,
  setShowGolfVoronoi,
  showMuseums,
  setShowMuseums,
  showMuseumVoronoi,
  setShowMuseumVoronoi,
  showMovieTheaters,
  setShowMovieTheaters,
  showMovieVoronoi,
  setShowMovieVoronoi,
  showLibraries,
  setShowLibraries,
  showLibraryVoronoi,
  setShowLibraryVoronoi,
  showHospitals,
  setShowHospitals,
  showHospitalVoronoi,
  setShowHospitalVoronoi,
  showForeignConsulates,
  setShowForeignConsulates,
  showConsulateVoronoi,
  setShowConsulateVoronoi,
  showFarmersMarkets,
  setShowFarmersMarkets,
  showMarketVoronoi,
  setShowMarketVoronoi,
}) {
  const [expandedSections, setExpandedSections] = useState({
    transportation: true,
    nature: false,
    entertainment: false,
    recreation: false,
    services: false,
    shopping: false
  })

  // Mobile drawer state
  const [isMobileExpanded, setIsMobileExpanded] = useState(false)
  const isMobile = useIsMobile()

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleMobileToggle = () => {
    setIsMobileExpanded(!isMobileExpanded)
  }

  // Auto-expand on mobile when any section is opened
  useEffect(() => {
    if (isMobile && Object.values(expandedSections).some(v => v)) {
      setIsMobileExpanded(true)
    }
  }, [expandedSections, isMobile])

  // Prevent body scroll when mobile drawer is expanded
  useEffect(() => {
    if (isMobile && isMobileExpanded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobile, isMobileExpanded])

  return (
    <>
      {isMobile && (
        <div 
          className={`map-controls-backdrop ${isMobileExpanded ? 'active' : ''}`}
          onClick={handleMobileToggle}
          aria-hidden="true"
        />
      )}
      <div className={`map-controls ${isMobileExpanded ? 'expanded' : ''}`}>
        {isMobile && (
          <button 
            className="mobile-controls-header"
            onClick={handleMobileToggle}
            type="button"
            aria-label={isMobileExpanded ? 'Collapse controls' : 'Expand controls'}
          >
            <span className="mobile-controls-title">Map Controls</span>
            <span className={`mobile-controls-arrow ${isMobileExpanded ? 'open' : ''}`}>
              {isMobileExpanded ? '▼' : '▲'}
            </span>
          </button>
        )}
        <div className="map-controls-content">
        <CollapsibleSection
          title="🚇 Transportation"
          isOpen={expandedSections.transportation}
          onToggle={() => toggleSection('transportation')}
        >
        <ToggleControl
          label="Stations"
          checked={showStations}
          onChange={(e) => setShowStations(e.target.checked)}
        />
        <ToggleControl
          label="1/4 Mile Radius"
          checked={showRadius}
          onChange={(e) => setShowRadius(e.target.checked)}
          disabled={!showStations}
          indent
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="🌲 Nature & Parks"
        isOpen={expandedSections.nature}
        onToggle={() => toggleSection('nature')}
      >
        <ToggleControl
          label="Mountains"
          checked={showMountains}
          onChange={(e) => setShowMountains(e.target.checked)}
        />
        <ToggleControl
          label="Mountain Voronoi"
          checked={showVoronoi}
          onChange={(e) => setShowVoronoi(e.target.checked)}
          disabled={!showMountains}
          indent
        />
        <ToggleControl
          label="Dog Parks"
          checked={showDogParks}
          onChange={(e) => setShowDogParks(e.target.checked)}
        />
        <ToggleControl
          label="Dog Park Voronoi"
          checked={showDogParkVoronoi}
          onChange={(e) => setShowDogParkVoronoi(e.target.checked)}
          disabled={!showDogParks}
          indent
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="🎭 Entertainment & Culture"
        isOpen={expandedSections.entertainment}
        onToggle={() => toggleSection('entertainment')}
      >
        <ToggleControl
          label="Museums"
          checked={showMuseums}
          onChange={(e) => setShowMuseums(e.target.checked)}
        />
        <ToggleControl
          label="Museum Voronoi"
          checked={showMuseumVoronoi}
          onChange={(e) => setShowMuseumVoronoi(e.target.checked)}
          disabled={!showMuseums}
          indent
        />
        <ToggleControl
          label="Movie Theaters"
          checked={showMovieTheaters}
          onChange={(e) => setShowMovieTheaters(e.target.checked)}
        />
        <ToggleControl
          label="Movie Voronoi"
          checked={showMovieVoronoi}
          onChange={(e) => setShowMovieVoronoi(e.target.checked)}
          disabled={!showMovieTheaters}
          indent
        />
        <ToggleControl
          label="Aquariums"
          checked={showAquariums}
          onChange={(e) => setShowAquariums(e.target.checked)}
        />
        <ToggleControl
          label="Aquarium Voronoi"
          checked={showAquariumVoronoi}
          onChange={(e) => setShowAquariumVoronoi(e.target.checked)}
          disabled={!showAquariums}
          indent
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="⛳ Recreation"
        isOpen={expandedSections.recreation}
        onToggle={() => toggleSection('recreation')}
      >
        <ToggleControl
          label="Golf Courses"
          checked={showGolfCourses}
          onChange={(e) => setShowGolfCourses(e.target.checked)}
        />
        <ToggleControl
          label="Golf Voronoi"
          checked={showGolfVoronoi}
          onChange={(e) => setShowGolfVoronoi(e.target.checked)}
          disabled={!showGolfCourses}
          indent
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="🏛️ Services"
        isOpen={expandedSections.services}
        onToggle={() => toggleSection('services')}
      >
        <ToggleControl
          label="Libraries"
          checked={showLibraries}
          onChange={(e) => setShowLibraries(e.target.checked)}
        />
        <ToggleControl
          label="Library Voronoi"
          checked={showLibraryVoronoi}
          onChange={(e) => setShowLibraryVoronoi(e.target.checked)}
          disabled={!showLibraries}
          indent
        />
        <ToggleControl
          label="Hospitals"
          checked={showHospitals}
          onChange={(e) => setShowHospitals(e.target.checked)}
        />
        <ToggleControl
          label="Hospital Voronoi"
          checked={showHospitalVoronoi}
          onChange={(e) => setShowHospitalVoronoi(e.target.checked)}
          disabled={!showHospitals}
          indent
        />
        <ToggleControl
          label="Foreign Consulates"
          checked={showForeignConsulates}
          onChange={(e) => setShowForeignConsulates(e.target.checked)}
        />
        <ToggleControl
          label="Consulate Voronoi"
          checked={showConsulateVoronoi}
          onChange={(e) => setShowConsulateVoronoi(e.target.checked)}
          disabled={!showForeignConsulates}
          indent
        />
      </CollapsibleSection>

      <CollapsibleSection
        title="🛒 Shopping & Food"
        isOpen={expandedSections.shopping}
        onToggle={() => toggleSection('shopping')}
      >
        <ToggleControl
          label="Farmers Markets"
          checked={showFarmersMarkets}
          onChange={(e) => setShowFarmersMarkets(e.target.checked)}
        />
        <ToggleControl
          label="Market Voronoi"
          checked={showMarketVoronoi}
          onChange={(e) => setShowMarketVoronoi(e.target.checked)}
          disabled={!showFarmersMarkets}
          indent
        />
      </CollapsibleSection>
        </div>
      </div>
    </>
  )
}

