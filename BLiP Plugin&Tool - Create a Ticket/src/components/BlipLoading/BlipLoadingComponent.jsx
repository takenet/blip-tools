import React from 'react'
import PropTypes from 'prop-types'

const BlipLoadingComponent = ({ className }) => {
  return (
    <div id="loading" className={`bp-loading ${className}`}>
      <div className="bp-loading__content">
        <div className="bp-loading1 bp-loading__circle"></div>
        <div className="bp-loading2 bp-loading__circle"></div>
        <div className="bp-loading3 bp-loading__circle"></div>
        <div className="bp-loading4 bp-loading__circle"></div>
        <div className="bp-loading5 bp-loading__circle"></div>
        <div className="bp-loading6 bp-loading__circle"></div>
        <div className="bp-loading7 bp-loading__circle"></div>
        <div className="bp-loading8 bp-loading__circle"></div>
        <div className="bp-loading9 bp-loading__circle"></div>
        <div className="bp-loading10 bp-loading__circle"></div>
        <div className="bp-loading11 bp-loading__circle"></div>
        <div className="bp-loading12 bp-loading__circle"></div>
      </div>
    </div>
  )
}

BlipLoadingComponent.propTypes = {
  className: PropTypes.string,
}

export { BlipLoadingComponent }
