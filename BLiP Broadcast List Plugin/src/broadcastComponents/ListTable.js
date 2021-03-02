import React, { useState } from 'react'
import { BlipTable } from 'components/BlipTable'
import { formatArrayToJson, sortData } from '../util'
import { Button } from 'react-bootstrap'
import { TiDelete } from 'react-icons/ti'
import PropTypes from 'prop-types'

const tableListsModel = [
  { label: '#', key: 'num' },
  { label: 'Name', key: 'name' },
]
function TableView({ data, deleteLists }) {
  const lists = formatArrayToJson(data)
  const [selected, setSeleted] = useState([])

  return (
    <>
      <h5>Lists</h5>
      <BlipTable
        idKey="num"
        model={tableListsModel}
        data={lists}
        onItemSelect={(item) => setSeleted(item)}
        canSelect={true}
        sort={{}}
        onSortSet={(item) => {
          sortData(lists, item)
        }}
        bodyHeight="700px"
        selectedItems={selected}
        actions={[
          <Button
            variant="danger"
            onClick={() => {
              deleteLists(selected)
              setSeleted([])
            }}
          >
            <TiDelete className="icon-size" /> Remove
          </Button>,
        ]}
      />
    </>
  )
}
TableView.propTypes = {
  data: PropTypes.array.isRequired,
  deleteLists: PropTypes.func.isRequired,
}

export default TableView
