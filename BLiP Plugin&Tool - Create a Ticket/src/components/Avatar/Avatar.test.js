import React from 'react'
import { Avatar } from './'
import { CommonProvider } from '../../contexts/CommonContext'
import { render } from 'enzyme'

describe('Testing Avatar', () => {
  it('Should render avatar with no editing permission', () => {
    const component = render(
      <CommonProvider>
        <Avatar
          img=""
          canEdit={false}
          changePicLabel="Change pic"
          onUpdateImage={() => {}}
        />
      </CommonProvider>
    )
    expect(component).toMatchSnapshot()
  })

  it('Should render avatar with placeholder', () => {
    const component = render(
      <CommonProvider>
        <Avatar
          canEdit={false}
          changePicLabel="Change pic"
          onUpdateImage={() => {}}
        />
      </CommonProvider>
    )
    expect(component).toMatchSnapshot()
  })

  it('Should show option to change image', () => {
    const component = render(
      <CommonProvider>
        <Avatar
          canEdit={true}
          changePicLabel="Change pic"
          onUpdateImage={() => {}}
        />
      </CommonProvider>
    )
    expect(component).toMatchSnapshot()
  })
})
