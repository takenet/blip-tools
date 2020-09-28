import React from "react"
import { Modal, Table } from "react-bootstrap"
import PropTypes from 'prop-types'

function ModalView({ data = {}, position, display, handleClose }) {
    position -= 400;
    const TableItems = () => {
        let items = [];
        if (data !== undefined) {
            const keys = Object.keys(data);
            keys.forEach(key => {
                items.push(
                    <tr key={key}>
                        <td><b>{key}</b></td>
                        <td>{data[key]}</td>
                    </tr>
                );

            });

        }
        return items;
    }


    return (
        <Modal style={{ paddingTop: position }} show={display} onHide={handleClose} >
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
    );
}


ModalView.propTypes = {
    data: Object.isRequired,
    position: PropTypes.number.isRequired,
    display: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}

export default ModalView 