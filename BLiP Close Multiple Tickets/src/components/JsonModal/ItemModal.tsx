import React from 'react'
import { Modal, Table } from 'react-bootstrap'
import PropTypes from 'prop-types'

export function ItemModal({ data = {}, position, display, handleClose }) {
  // eslint-disable-next-line no-param-reassign
  position -= 400
  const TableItems = (): JSX.Element => {
    const items = []
    if (data !== undefined) {
      const keys = Object.keys(data)
      keys.forEach((key) => {
        items.push(
          <tr key={key}>
            <td>
              <b>{key}</b>
            </td>
            <td>{data[key]}</td>
          </tr>
        )
      })
    }
    return <>{items.map((e) => e)}</>
  }

  return (
    <Modal style={{ paddingTop: position, padding: '50px' }} show={display} onHide={handleClose}>
      <Modal.Header closeButton>
        <h3>Ticket information</h3>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <tbody>
            <TableItems />
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  )
}

ItemModal.propTypes = {
  data: PropTypes.object,
  position: PropTypes.number.isRequired,
  display: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}
