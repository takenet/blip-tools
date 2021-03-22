import React from 'react'
import PropTypes from 'prop-types'
import { BlipCheckBox } from '../BlipCheckBox'

const Sorter = ({ property, currentSort, setSort }) => {
  return (
    <div
      className="ordinator flex flex-column justify-center mr2 pointer"
      onClick={() =>
        setSort({
          property,
          order:
            currentSort.property === property && currentSort.order === 'asc'
              ? 'desc'
              : 'asc',
        })
      }
    >
      <span
        className={`arrow asc mb1 ${
          currentSort.property === property && currentSort.order === 'asc'
            ? 'active'
            : ''
        }`}
      ></span>
      <span
        className={`arrow desc ${
          currentSort.property === property && currentSort.order === 'desc'
            ? 'active'
            : ''
        }`}
      ></span>
    </div>
  )
}

Sorter.propTypes = {
  property: PropTypes.string.isRequired,
  currentSort: PropTypes.object,
  setSort: PropTypes.func.isRequired,
}

const BlipTableComponent = ({
  model,
  data,
  selectedItems,
  idKey,
  toggleSelect,
  toggleSelectAll,
  canSelect,
  currentSort,
  setSort,
  content,
  actions,
  emptyMessage,
  isAllSelected,
  bodyHeight,
}) => {
  return (
    <table className="bp-table w-100 tl bp-table--scroll-y ">
      <thead className="bp-c-desk">
        <tr className="w-100">
          {canSelect && data.length > 0 && (
            <th className="w3">
              <BlipCheckBox
                toggleCheck={toggleSelectAll}
                checked={isAllSelected()}
              />
            </th>
          )}
          {model.map((property) => (
            <th key={property.key}>
              <div className="flex items-center">
                {!property.notSortable && (
                  <Sorter
                    property={property.key}
                    currentSort={currentSort}
                    setSort={setSort}
                  />
                )}
                <p>{property.label}</p>
              </div>
            </th>
          ))}
          {canSelect && (
            <th className="w5">
              <div
                className={`selectedItems flex justify-around items-center ${
                  selectedItems.length > 0 ? '' : 'hidden'
                }`}
              >
                <p className="nowrap">
                  {selectedItems.length} {content.selected}
                </p>
                {actions}
              </div>
            </th>
          )}
        </tr>
      </thead>
      <tbody
        style={{
          maxHeight: bodyHeight,
        }}
      >
        {data.length > 0 ? (
          data.map((item) => {
            const isSelected = selectedItems.some(
              (selectedItem) => item[idKey] === selectedItem[idKey]
            )
            return (
              <tr
                key={item[idKey]}
                className={`${isSelected ? 'selected' : ''}`}
              >
                {canSelect && (
                  <td className="w3">
                    <BlipCheckBox
                      toggleCheck={() => toggleSelect(item)}
                      checked={isSelected}
                    />
                  </td>
                )}

                {model.map((property) => (
                  <td
                    key={property.key + item[idKey]}
                    title={item[property.key]}
                  >
                    {item[property.key]}
                  </td>
                ))}

                {canSelect && <td className="w5">{item['actions']}</td>}
              </tr>
            )
          })
        ) : (
          <tr className="w-100 bp-bg-offwhite tc">
            <td className="bp-bg-offwhite" colSpan={model.length + 1}>
              <p className="empty-message pa5">{emptyMessage}</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

BlipTableComponent.propTypes = {
  model: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  selectedItems: PropTypes.array.isRequired,
  idKey: PropTypes.string.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  toggleSelectAll: PropTypes.func.isRequired,
  canSelect: PropTypes.bool,
  currentSort: PropTypes.object,
  setSort: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired,
  actions: PropTypes.arrayOf(PropTypes.node),
  emptyMessage: PropTypes.string.isRequired,
  isAllSelected: PropTypes.func.isRequired,
  bodyHeight: PropTypes.string.isRequired,
}

export { BlipTableComponent }
