import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { BlipSelect } from 'blip-toolkit'

const BlipSelectComponent = (props) => {
  const wrapper = useRef(undefined)
  const instance = new BlipSelect(props)

  useEffect(() => {
    if (instance) {
      const element = instance.render(props)
      wrapper.current.innerHTML = ''
      wrapper.current.appendChild(element)
    }
  }, [instance, props])

  return <div ref={wrapper} className={props.className} />
}

BlipSelectComponent.propTypes = {
  className: PropTypes.string,
}

export { BlipSelectComponent }
