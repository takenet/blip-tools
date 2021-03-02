import React, { useState } from 'react'
import { Button, Pagination } from 'react-bootstrap'
import { FiUserMinus } from 'react-icons/fi'
import { countIndex, formatArrayToJson, sortData } from '../util'
import { BlipTable } from 'components/BlipTable'
import PropTypes from 'prop-types'

const tableModel = [
  { label: '#', key: 'num' },
  { label: 'Name', key: 'name' },
]
function MembersTable({
  data,
  total,
  pagination,
  setPagination,
  handleRemove,
}) {
  const members = formatArrayToJson(data, pagination)
  const [selected, setSeleted] = useState([])

  const handlePagination = (index) => {
    setPagination(index)
  }

  const Items = () => {
    const items = []
    if (countIndex(total) > 1) {
      for (let index = 0; index < countIndex(total); index++) {
        items.push(
          <Pagination.Item
            key={index + 1}
            active={index + 1 === pagination + 1}
            onClick={() => {
              handlePagination(index)
            }}
          >
            {index + 1}
          </Pagination.Item>
        )
      }
    }
    return items
  }
  return (
    <div>
      <h5>Members</h5>
      <BlipTable
        idKey="num"
        model={tableModel}
        data={members}
        onItemSelect={(item) => setSeleted(item)}
        canSelect={true}
        sort={{}}
        onSortSet={(item) => {
          sortData(members, item)
        }}
        bodyHeight="1300px"
        selectedItems={selected}
        actions={[
          <Button
            key="button"
            variant="danger"
            onClick={() => {
              handleRemove(selected)
              setSeleted([])
            }}
          >
            <FiUserMinus key="icon" /> Remove
          </Button>,
        ]}
      />

      <div className="float-right">
        <Pagination>
          <Items />
        </Pagination>
      </div>
    </div>
  )
}
MembersTable.propTypes = {
  data: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  pagination: PropTypes.number.isRequired,
  setPagination: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}
export default MembersTable
