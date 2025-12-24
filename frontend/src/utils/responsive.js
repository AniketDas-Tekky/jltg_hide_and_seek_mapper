/**
 * Responsive utility functions
 */
import { useState, useEffect } from 'react'

/**
 * Hook to detect if screen is mobile size
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

/**
 * Get responsive breakpoints
 */
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
}

/**
 * Check if current viewport matches breakpoint
 */
export const isBreakpoint = (breakpoint) => {
  if (typeof window === 'undefined') return false
  return window.innerWidth <= BREAKPOINTS[breakpoint]
}

