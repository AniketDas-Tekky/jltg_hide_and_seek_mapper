/**
 * ToggleControl component - a styled toggle switch
 */
import './ToggleControl.css'

export default function ToggleControl({ label, checked, onChange, disabled = false, indent = false }) {
  return (
    <label className={`map-toggle ${indent ? 'toggle-indent' : ''}`}>
      <span className="toggle-label">{label}</span>
      <div className="toggle-switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="toggle-slider"></span>
      </div>
    </label>
  )
}

