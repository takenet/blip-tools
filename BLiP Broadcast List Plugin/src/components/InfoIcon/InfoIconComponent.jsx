import React from 'react'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import InfoIcon from 'assets/images/info-icon.svg'
import './InfoIcon.scss'

export const InfoIconComponent = ({ text, place = 'bottom' }) => {
  const tooltipId = `info-tooltip-${uuid.v4()}`

  return (
    <>
      <img src={InfoIcon} data-for={tooltipId} data-tip={text} alt={text} />
      <ReactTooltip
        className="tooltip-info-icon"
        place={place}
        id={tooltipId}
      />
    </>
  )
}

InfoIconComponent.propTypes = {
  text: PropTypes.string,
  place: PropTypes.string,
}
