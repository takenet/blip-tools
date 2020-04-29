import React, { useState } from "react"
import { AiOutlineFileAdd } from 'react-icons/ai';
import { Row, Form, Button, Col } from "react-bootstrap";
import PropTypes from 'prop-types';

function ListForm({handleSubmit}) {
    const [newListName, setNewListName] = useState('');


    return (
        <Form onSubmit={(e) => { handleSubmit(e, newListName); setNewListName('') }}>
            <Form.Group controlId="formBasic">
                <Form.Label>New List</Form.Label>
                <Row>
                    <Col sm="6">
                        <Form.Control type="text" value={newListName} onChange={(e) => { setNewListName(e.target.value) }} placeholder="Mylist"  required />
                    </Col>
                    <Col sm="3">
                        <Button variant="success" type="submit"> <AiOutlineFileAdd /> Add  </Button>
                    </Col>
                </Row>
            </Form.Group>

        </Form>
    );
}

ListForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
}

export default ListForm