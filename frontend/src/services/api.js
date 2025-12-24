/**
 * API service for fetching data from the backend
 */

const API_BASE = '/api'

/**
 * Fetch data from an API endpoint
 * @param {string} endpoint - API endpoint path
 * @returns {Promise<Object>} Response data
 */
async function fetchAPI(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`)
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
    throw new Error(errorData.detail || `HTTP ${response.status}: Failed to fetch ${endpoint}`)
  }
  return response.json()
}

/**
 * Fetch San Francisco boundary
 */
export const fetchSFBoundary = () => fetchAPI('/boundaries/sf')

/**
 * Fetch stations data
 */
export const fetchStations = () => fetchAPI('/stations')

/**
 * Fetch mountains data
 */
export const fetchMountains = () => fetchAPI('/mountains')

/**
 * Fetch dog parks data
 */
export const fetchDogParks = () => fetchAPI('/dog-parks')

/**
 * Fetch aquariums data
 */
export const fetchAquariums = () => fetchAPI('/aquariums')

/**
 * Fetch golf courses data
 */
export const fetchGolfCourses = () => fetchAPI('/golf-courses')

/**
 * Fetch museums data
 */
export const fetchMuseums = () => fetchAPI('/museums')

/**
 * Fetch movie theaters data
 */
export const fetchMovieTheaters = () => fetchAPI('/movie-theaters')

/**
 * Fetch libraries data
 */
export const fetchLibraries = () => fetchAPI('/libraries')

/**
 * Fetch hospitals data
 */
export const fetchHospitals = () => fetchAPI('/hospitals')

/**
 * Fetch foreign consulates data
 */
export const fetchForeignConsulates = () => fetchAPI('/foreign-consulates')

/**
 * Fetch farmers markets data
 */
export const fetchFarmersMarkets = () => fetchAPI('/farmers-markets')

