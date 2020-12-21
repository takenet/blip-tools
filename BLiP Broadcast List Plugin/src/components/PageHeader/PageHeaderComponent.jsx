import React from 'react'
import Proptypes from 'prop-types'

export const PageHeaderComponent = ({ title }) => (
  <>
    <div className="pv2 header">
      <h1 className="bp-fs-3 bp-c-city">{title}</h1>
    </div>
    <div className="bp-divider-h"></div>
  </>
)

PageHeaderComponent.propTypes = {
  title: Proptypes.string,
}
