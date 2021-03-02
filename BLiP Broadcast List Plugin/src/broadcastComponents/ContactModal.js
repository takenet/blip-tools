import React from 'react'
import { Modal, Table } from 'react-bootstrap'
import PropTypes from 'prop-types'

function ModalView({ data, position, display, handleClose }) {
  // eslint-disable-next-line no-param-reassign
  position -= 200
  const Extras = () => {
    const items = []
    if (data.extras !== undefined) {
      const keys = Object.keys(data.extras)
      keys.forEach((key) => {
        items.push(
          <tr key={key}>
            <td>
              <b>{key}</b>
            </td>
            <td>{data.extras[key]}</td>
          </tr>
        )
      })
    }
    return items
  }

  return (
    <Modal style={{ paddingTop: position }} show={display} onHide={handleClose}>
      <Modal.Header closeButton>
        <h3>Contact information</h3>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>
                <b>Identity</b>
              </td>
              <td>{data.identity}</td>
            </tr>
            <tr>
              <td>
                <b>Name</b>
              </td>
              <td>{data.name}</td>
            </tr>
            <tr>
              <td>
                <b>Source</b>
              </td>
              <td>{data.source}</td>
            </tr>
            <tr>
              <td>
                <b>Group</b>
              </td>
              <td>{data.group}</td>
            </tr>
            <Extras />
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  )
}

ModalView.propTypes = {
  data: PropTypes.arrayOf(Object).isRequired,
  position: PropTypes.number.isRequired,
  display: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default ModalView
