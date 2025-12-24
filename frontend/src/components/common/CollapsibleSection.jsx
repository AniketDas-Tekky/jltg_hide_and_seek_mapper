/**
 * CollapsibleSection component - a collapsible section with header
 */
import './CollapsibleSection.css'

export default function CollapsibleSection({ title, isOpen, onToggle, children }) {
  return (
    <div className="control-section">
      <button 
        className="section-header" 
        onClick={onToggle}
        type="button"
      >
        <span className="section-title">{title}</span>
        <span className={`section-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <div className="section-content">
          {children}
        </div>
      )}
    </div>
  )
}

