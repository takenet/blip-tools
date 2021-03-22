import React from 'react'
import { BlipIcon } from '.'
import { shallow } from 'enzyme'

describe('Testing BlipIcon', () => {
  it('Should render outline icon', () => {
    const component = shallow(<BlipIcon name="close" />)
    expect(component).toMatchSnapshot()
  })

  it('Should render solid icon', () => {
    const component = shallow(<BlipIcon name="close" solid={true} />)
    expect(component).toMatchSnapshot()
  })
})
