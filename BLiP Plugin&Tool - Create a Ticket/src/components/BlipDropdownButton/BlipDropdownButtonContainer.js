import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BlipDropdownButtonComponent } from './BlipDropdownButtonComponent'

const BlipDropdownButtonContainer = ({
  buttonClass,
  dropdownClass,
  label,
  children,
  onOpenDropdown,
  onCloseDropdown,
  arrowSide = 'left',
  footer = [],
}) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    if (showDropdown) {
      onCloseDropdown !== undefined && onCloseDropdown()
    } else {
      onOpenDropdown !== undefined && onOpenDropdown()
    }
    setShowDropdown(!showDropdown)
  }

  return (
    <BlipDropdownButtonComponent
      buttonClass={buttonClass}
      dropdownClass={dropdownClass}
      label={label}
      arrowSide={arrowSide}
      showDropdown={showDropdown}
      toggleDropdown={toggleDropdown}
      footer={footer}
    >
      {children}
    </BlipDropdownButtonComponent>
  )
}

BlipDropdownButtonContainer.propTypes = {
  buttonClass: PropTypes.string,
  dropdownClass: PropTypes.string,
  label: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  onOpenDropdown: PropTypes.func,
  onCloseDropdown: PropTypes.func,
  arrowSide: PropTypes.string,
  footer: PropTypes.arrayOf(PropTypes.node),
}

export { BlipDropdownButtonContainer }
