import React, { useState } from 'react'
import { Button, Row, Col, Pagination } from 'react-bootstrap'
import FilterForm from './FilterForm'
import { removeDuplicates, countIndex, sortData } from '../util'
import { FiUserPlus, FiSearch } from 'react-icons/fi'
import ContactModal from './ContactModal'
import { BlipTable } from 'components/BlipTable'
import PropTypes from 'prop-types'

const tableModel = [
  { label: 'Identity', key: 'identity' },
  { label: 'Name', key: 'name' },
  { label: 'Source', key: 'source' },
  { label: '', key: 'isMember' },
]
function ContactTable({
  data,
  minus,
  setPagination,
  total,
  pagination,
  handleAdd,
  filter,
}) {
  const contacts = removeDuplicates(data, minus)
  const [filterDisplay, setFilterDisplay] = useState(false)
  const [modal, setModal] = useState({
    position: 0,
    display: false,
  })
  const [contactSelected, setContactSelected] = useState([])

  const [selected, setSeleted] = useState([])

  const handlePagination = (index) => {
    setPagination(index)
  }
  const handleOpenModal = (event, contact) => {
    setContactSelected(contact)
    setModal({ position: event.nativeEvent.clientY, display: true })
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
      <ContactModal
        position={modal.position}
        display={modal.display}
        data={contactSelected}
        handleClose={() => setModal({ ...modal, display: false })}
      />
      <h5>Contacts</h5>
      <Row>
        <Col md="9">
          <p> Click on contacts to see their information </p>
        </Col>
        <Col md="3">
          <Button
            block
            style={{ display: !filterDisplay ? '' : 'none' }}
            onClick={() => {
              setFilterDisplay(true)
            }}
          >
            {' '}
            <FiSearch /> Filter
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={!filterDisplay ? 12 : 8}>
          <BlipTable
            idKey="identity"
            model={tableModel}
            data={contacts}
            onItemSelect={(item) => setSeleted(item)}
            canSelect={true}
            sort={{}}
            onItemClick={(event, item) => {
              handleOpenModal(event, item)
            }}
            onSortSet={(item) => {
              sortData(contacts, item)
            }}
            bodyHeight="1300px"
            selectedItems={selected}
            actions={[
              <Button
                variant="success"
                style={{ display: 'block', margin: 'auto' }}
                onClick={() => {
                  handleAdd(selected)
                  setSeleted([])
                }}
              >
                {' '}
                <FiUserPlus /> Add
              </Button>,
            ]}
          />
          <div className="float-right">
            <Pagination className="pagination">
              <Items />
            </Pagination>
          </div>
        </Col>
        <Col md={!filterDisplay ? 0 : 4}>
          <FilterForm
            activated={filterDisplay}
            disable={() => setFilterDisplay(false)}
            applyFilter={(fill) => {
              filter(fill)
            }}
          />
        </Col>
      </Row>
    </div>
  )
}
ContactTable.propTypes = {
  data: PropTypes.array.isRequired,
  minus: PropTypes.array.isRequired,
  setPagination: PropTypes.func.isRequired,
  total: PropTypes.number,
  pagination: PropTypes.number.isRequired,
  handleAdd: PropTypes.func.isRequired,
  filter: PropTypes.func.isRequired,
}

export default ContactTable
