import React from 'react'
import PropTypes from 'prop-types'

export const BlipCheckBoxComponent = ({ label, checked, toggleCheck }) => {
  return (
    <label className="bp-input--check--wrapper">
      <input
        onChange={toggleCheck}
        className="bp-input"
        type="checkbox"
        name="checkbox-group"
        checked={checked}
      />
      <div className="bp-input--checkbox">{String.fromCharCode('10003')}</div>
      {label && <span>{label}</span>}
    </label>
  )
}

BlipCheckBoxComponent.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  toggleCheck: PropTypes.func,
}
