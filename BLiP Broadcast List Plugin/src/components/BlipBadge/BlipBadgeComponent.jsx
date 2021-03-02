import React from 'react'
import PropTypes from 'prop-types'

export const BlipBadgeComponent = ({
  value,
  color = 'warning',
  textColor = 'whisper',
  ...otherProps
}) => {
  return (
    <span
      {...otherProps}
      className={`badge bp-fs-7 ph1 br-100 bp-c-${textColor} bp-bg-${color}`}
    >
      {value}
    </span>
  )
}

BlipBadgeComponent.propTypes = {
  value: PropTypes.any.isRequired,
  color: PropTypes.string,
  textColor: PropTypes.string,
}
