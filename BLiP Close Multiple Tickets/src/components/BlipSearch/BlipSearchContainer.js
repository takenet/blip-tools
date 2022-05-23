import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { BlipSearchComponent } from './BlipSearchComponent'

const BlipSearchContainer = ({ onChange, debounce }) => {
  const [shouldShowInput, setShouldShowInput] = useState(false)
  const showInput = () => {
    setShouldShowInput(true)
    inputRef.current.focus()
  }
  const hideInput = () => setShouldShowInput(false)
  const inputRef = useRef(undefined)
  return (
    <BlipSearchComponent
      onChange={onChange}
      shouldShowInput={shouldShowInput}
      showInput={showInput}
      hideInput={hideInput}
      inputRef={inputRef}
      debounce={debounce || 0}
    />
  )
}

BlipSearchContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  debounce: PropTypes.number,
}

export { BlipSearchContainer }
