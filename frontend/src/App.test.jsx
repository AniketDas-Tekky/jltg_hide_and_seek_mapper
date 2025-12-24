import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

// Mock the Map component
vi.mock('./components/Map', () => ({
  default: () => <div data-testid="map-component">Map Component</div>,
}))

describe('App Component', () => {
  it('renders the app header', () => {
    render(<App />)
    expect(screen.getByText('San Francisco, CA - OpenStreetMap')).toBeInTheDocument()
  })

  it('renders the Map component', () => {
    render(<App />)
    expect(screen.getByTestId('map-component')).toBeInTheDocument()
  })
})

