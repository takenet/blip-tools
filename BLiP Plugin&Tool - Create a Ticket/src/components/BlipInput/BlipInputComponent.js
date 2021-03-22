import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { BlipInput } from 'blip-toolkit'

export const BlipInputReact = (props) => {
  const wrapper = useRef(undefined)
  const instance = new BlipInput(props)

  useEffect(() => {
    if (instance) {
      const element = instance.render(props)
      wrapper.current.appendChild(element)
    }
  })

  return <div ref={wrapper} className={props.className} />
}

BlipInputReact.propTypes = {
  className: PropTypes.string,
}
