import React, { useState } from "react"
import { AiOutlineFileAdd } from 'react-icons/ai';
import { Row, Form, Button, Col } from "react-bootstrap"
function ListForm(props) {
    const [newListName, setNewListName] = useState('');


    return (
        <Form onSubmit={(e)=> {props.handleSubmit(e,newListName); setNewListName('')}}>
            <Form.Group controlId="formBasic">
                <Form.Label>Nova lista</Form.Label>
                <Row>
                    <Col sm="6">
                        <Form.Control type="text" value={newListName} onChange={(e) => { setNewListName(e.target.value) }} placeholder="Minha Lista" required />
                    </Col>
                    <Col sm="3">
                        <Button variant="success" type="submit"> <AiOutlineFileAdd /> Criar  </Button>
                    </Col>
                </Row>
            </Form.Group>

        </Form>
    );
}

export default ListForm