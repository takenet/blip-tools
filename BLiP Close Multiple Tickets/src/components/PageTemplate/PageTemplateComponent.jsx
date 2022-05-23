import React from 'react'
import PropTypes from 'prop-types'

const PageTemplateComponent = ({ children }) => {
  return (
    <>
      <div className="pv4">
        <div className="bp-card bp-card--left-arrow">{children}</div>
      </div>
    </>
  )
}

PageTemplateComponent.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export { PageTemplateComponent }
