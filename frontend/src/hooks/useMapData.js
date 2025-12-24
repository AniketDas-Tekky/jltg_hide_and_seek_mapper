/**
 * Custom hook for fetching map data
 */
import { useState, useEffect } from 'react'
import * as api from '../services/api'

/**
 * Hook to fetch SF boundary
 */
export const useSFBoundary = () => {
  const [boundary, setBoundary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBoundary = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await api.fetchSFBoundary()
        setBoundary(data)
      } catch (err) {
        console.error('Error fetching SF boundary:', err)
        let errorMessage = err.message
        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          errorMessage = 'Cannot connect to backend. Make sure the FastAPI server is running on port 8000.'
        }
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchBoundary()
  }, [])

  return { boundary, loading, error }
}

/**
 * Hook to fetch category data
 */
export const useCategoryData = (fetchFunction, responseKey) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetchFunction()
        setData(response[responseKey] || [])
      } catch (err) {
        console.error(`Error fetching ${responseKey}:`, err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [fetchFunction, responseKey])

  return { data, loading, error }
}

/**
 * Hook to fetch all category data
 */
export const useAllCategoryData = () => {
  const [stations, setStations] = useState([])
  const [mountains, setMountains] = useState([])
  const [dogParks, setDogParks] = useState([])
  const [aquariums, setAquariums] = useState([])
  const [golfCourses, setGolfCourses] = useState([])
  const [museums, setMuseums] = useState([])
  const [movieTheaters, setMovieTheaters] = useState([])
  const [libraries, setLibraries] = useState([])
  const [hospitals, setHospitals] = useState([])
  const [foreignConsulates, setForeignConsulates] = useState([])
  const [farmersMarkets, setFarmersMarkets] = useState([])

  useEffect(() => {
    const fetchCategory = async (fetchFn, setter, responseKey) => {
      try {
        const response = await fetchFn()
        setter(response[responseKey] || [])
      } catch (err) {
        console.error(`Error fetching ${responseKey}:`, err)
      }
    }

    fetchCategory(api.fetchStations, setStations, 'stations')
    fetchCategory(api.fetchMountains, setMountains, 'mountains')
    fetchCategory(api.fetchDogParks, setDogParks, 'dog_parks')
    fetchCategory(api.fetchAquariums, setAquariums, 'aquariums')
    fetchCategory(api.fetchGolfCourses, setGolfCourses, 'golf_courses')
    fetchCategory(api.fetchMuseums, setMuseums, 'museums')
    fetchCategory(api.fetchMovieTheaters, setMovieTheaters, 'movie_theaters')
    fetchCategory(api.fetchLibraries, setLibraries, 'libraries')
    fetchCategory(api.fetchHospitals, setHospitals, 'hospitals')
    fetchCategory(api.fetchForeignConsulates, setForeignConsulates, 'foreign_consulates')
    fetchCategory(api.fetchFarmersMarkets, setFarmersMarkets, 'farmers_markets')
  }, [])

  return {
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
  }
}

