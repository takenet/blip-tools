import React from 'react'
import PropTypes from 'prop-types'

import icons from './defs.svg'

export const BlipIconComponent = ({
  name,
  color = 'blip-light',
  className,
  solid,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      width="1em"
      height="1em"
    >
      <use
        xlinkHref={`${icons}#${name}${solid ? '-solid' : '-outline'}`}
        className={`bp-icon--${color}`}
      />
    </svg>
  )
}

BlipIconComponent.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  solid: PropTypes.bool,
}
