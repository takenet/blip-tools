import React, { useState, useCallback } from 'react'
import { BlipTableComponent } from './BlipTableComponent'
import PropTypes from 'prop-types'
import { useContentLocalizer } from '../../hooks/useContentLocalizer'
import { localization } from './localization'

const BlipTableContainer = ({
  model,
  data,
  idKey = 'id',
  onItemSelect,
  onSortSet,
  canSelect = false,
  actions,
  emptyMessage,
  selectedItems,
  bodyHeight = '200px',
}) => {
  const [currentSort, setCurrentSort] = useState({ property: '', order: '' })

  const content = useContentLocalizer(localization)

  const toggleSelect = (item) => {
    let tempSelectedItems = [...selectedItems]
    if (
      selectedItems.some((selectedItem) => item[idKey] === selectedItem[idKey])
    ) {
      tempSelectedItems = tempSelectedItems.filter(
        (selectedItem) => item[idKey] !== selectedItem[idKey]
      )
    } else {
      tempSelectedItems.push(item)
    }
    onItemSelect !== undefined && onItemSelect(tempSelectedItems)
  }

  const isAllSelected = useCallback(() => {
    if (selectedItems.length === 0) {
      return false
    }
    let itIs = true
    data.forEach((item) => {
      if (
        !selectedItems.some(
          (selectedItem) => item[idKey] === selectedItem[idKey]
        )
      ) {
        itIs = false
      }
    })
    return itIs
  }, [selectedItems, data, idKey])

  const toggleSelectAll = () => {
    let tempSelectedItems
    if (isAllSelected()) {
      tempSelectedItems = []
    } else {
      tempSelectedItems = [...data]
    }
    onItemSelect !== undefined && onItemSelect(tempSelectedItems)
  }

  const setSort = (sort) => {
    onSortSet !== undefined && onSortSet(sort)
    setCurrentSort(sort)
  }

  return (
    <BlipTableComponent
      model={model}
      data={data}
      idKey={idKey}
      selectedItems={selectedItems}
      toggleSelect={toggleSelect}
      toggleSelectAll={toggleSelectAll}
      canSelect={canSelect}
      currentSort={currentSort}
      setSort={setSort}
      content={content}
      actions={actions}
      emptyMessage={emptyMessage || content.emptyMessage}
      isAllSelected={isAllSelected}
      bodyHeight={bodyHeight}
    />
  )
}

BlipTableContainer.propTypes = {
  model: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  idKey: PropTypes.string,
  onItemSelect: PropTypes.func,
  onSortSet: PropTypes.func,
  canSelect: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.node),
  emptyMessage: PropTypes.string,
  selectedItems: PropTypes.arrayOf(Object).isRequired,
  bodyHeight: PropTypes.string,
}

export { BlipTableContainer }
