import React from 'react'
import { mount } from 'enzyme'
import { BlipTable } from '.'
import { useContentLocalizer } from 'hooks/useContentLocalizer'

jest.mock('hooks/useContentLocalizer')

useContentLocalizer.mockImplementation(() => ({
  selected: 'selecionado(s)',
  emptyMessage: 'Não há dados',
}))

const mockModel = [
  { label: 'Primeira coluna', key: 'p' },
  { label: 'Segunda coluna', key: 's' },
]

const mockData = [
  { id: 1, p: 'p1', s: 's1' },
  { id: 2, p: 'p2', s: 's2' },
  { id: 3, p: 'p3', s: 's3' },
]

describe('Testing BlipTable', () => {
  it('Should render empty table and show message', () => {
    const component = mount(
      <BlipTable
        model={mockModel}
        data={[]}
        selectedItems={[]}
        canSelect={false}
      />
    )

    expect(component.exists('p.empty-message')).toBeTruthy()
    expect(component).toMatchSnapshot()
  })

  it('Should render table with reading permission', () => {
    const component = mount(
      <BlipTable
        model={mockModel}
        data={mockData}
        selectedItems={[]}
        canSelect={false}
      />
    )

    expect(component.exists('p.empty-message')).toBeFalsy()
    expect(component.exists('.bp-input--check--wrapper')).toBeFalsy()
    expect(component.find('tr').length).toBe(4)
    expect(component.find('.ordinator').length).toBe(2)
    expect(component).toMatchSnapshot()
  })

  it('Should render table with editing permission', () => {
    const component = mount(
      <BlipTable
        model={mockModel}
        data={mockData}
        selectedItems={[]}
        canSelect={true}
      />
    )

    expect(component.exists('p.empty-message')).toBeFalsy()
    expect(component.exists('.selectedItems.hidden')).toBeTruthy()
    expect(component.find('.bp-input--check--wrapper').length).toBe(4)
    expect(component.find('tr').length).toBe(4)
    expect(component.find('.ordinator').length).toBe(2)
    expect(component).toMatchSnapshot()
  })

  it('Should allow to select items', () => {
    const component = mount(
      <BlipTable
        model={mockModel}
        data={mockData}
        selectedItems={mockData.slice(0, 2)}
        canSelect={true}
      />
    )

    const checkBoxes = component.find({ type: 'checkbox' })
    const checkedBoxes = checkBoxes.reduce(
      (total, checkbox) =>
        checkbox.props().checked === true ? total + 1 : total,
      0
    )

    expect(component.exists('.selectedItems.hidden')).toBeFalsy()
    expect(checkBoxes.length).toBe(4)
    expect(checkedBoxes).toBe(2)
    expect(component).toMatchSnapshot()
  })

  it('Should show actions', () => {
    const component = mount(
      <BlipTable
        model={mockModel}
        data={mockData}
        selectedItems={mockData.slice(0, 2)}
        canSelect={true}
        actions={[
          <button key="test" id="action-test">
            teste
          </button>,
        ]}
      />
    )

    expect(component.exists('#action-test')).toBeTruthy()
    expect(component).toMatchSnapshot()
  })

  it('Should allow show all items are selected', () => {
    const component = mount(
      <BlipTable
        model={mockModel}
        data={mockData}
        selectedItems={mockData}
        canSelect={true}
      />
    )

    const checkBoxes = component.find({ type: 'checkbox' })
    const checkedBoxes = checkBoxes.reduce(
      (total, checkbox) =>
        checkbox.props().checked === true ? total + 1 : total,
      0
    )

    expect(checkBoxes.length).toBe(4)
    expect(checkedBoxes).toBe(4)
    expect(component).toMatchSnapshot()
  })

  it('Should call function when click sort', () => {
    const onSortSet = jest.fn(() => {})

    const component = mount(
      <BlipTable
        model={mockModel}
        data={mockData}
        selectedItems={[]}
        canSelect={true}
        onSortSet={onSortSet}
      />
    )

    const ordinators = component.find('.ordinator')
    ordinators.last().simulate('click')

    expect(onSortSet.mock.calls.length).toBe(1)
  })
})
