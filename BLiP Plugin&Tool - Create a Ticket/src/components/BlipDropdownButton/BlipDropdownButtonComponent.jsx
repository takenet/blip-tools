import React from 'react'
import PropTypes from 'prop-types'

const BlipDropdownButtonComponent = ({
  buttonClass,
  dropdownClass,
  label,
  children,
  arrowSide,
  showDropdown,
  toggleDropdown,
  footer,
}) => {
  return (
    <div className="BlipDropdownButton relative">
      <button className={`bp-btn ${buttonClass}`} onClick={toggleDropdown}>
        {label}
      </button>
      {showDropdown && (
        <>
          <div className="overlay z-1" onClick={toggleDropdown}></div>
          <div
            className={`bp-card bp-card--${arrowSide}-arrow pa0 z-2 absolute ${dropdownClass}`}
          >
            <div className="pa3">{children}</div>
            {footer.length > 0 && (
              <>
                <div className="bp-divider-h" />
                <div
                  className="pa2 flex flex-row-reverse"
                  onClick={toggleDropdown}
                >
                  {footer}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

BlipDropdownButtonComponent.propTypes = {
  buttonClass: PropTypes.string,
  dropdownClass: PropTypes.string,
  label: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  arrowSide: PropTypes.string.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  footer: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export { BlipDropdownButtonComponent }
