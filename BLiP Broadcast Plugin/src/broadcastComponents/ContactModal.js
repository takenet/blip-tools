
import React from "react"
import { Modal, Table } from "react-bootstrap"

function ModalView(props) {

    const Extras = () => {
        let items = [];
        if (props.data.extras !== undefined) {
            const keys = Object.keys(props.data.extras);
            keys.forEach(key => {
                items.push(
                    <tr key={key}>
                        <td><b>{key}</b></td>
                        <td>{props.data.extras[key]}</td>
                    </tr>
                );

            });

        }
        return items;
    }


    return (
        <Modal show={props.display} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <h3>Informações do contato</h3>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td><b>Id do Usuário</b></td>
                            <td>{props.data.identity}</td>
                        </tr>
                        <tr>
                            <td><b>Nome</b></td>
                            <td>{props.data.name}</td>
                        </tr>
                        <tr>
                            <td><b>Origem</b></td>
                            <td>{props.data.source}</td>
                        </tr>
                        <tr>
                            <td><b>Grupo</b></td>
                            <td>{props.data.group}</td>
                        </tr>
                        <Extras />
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
}


export default ModalView