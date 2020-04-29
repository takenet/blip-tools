import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap"
import { removeEmptyFields } from '../util';
import { FiX } from "react-icons/fi";
function ContactForm({ onAdd }) {
    const [formModel, setFormModel] = useState({
        identity: '',
        name: '',
        email: '',
        gender: 'Male',
        phoneNumber: ''
    });
    const [extras, setExtras] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        let aux = {};
        for (const key in extras) {
            if (extras[key].actived &&
                extras[key].key.length > 0
                && extras[key].value.length > 0)
                aux = { ...aux, [extras[key].key]: extras[key].value }
        }
        if (Object.keys(aux).length > 0)
            onAdd({ ...removeEmptyFields(formModel), extras: { ...aux } });
        else
            onAdd(removeEmptyFields(formModel))

    }

    const handleAddExtras = (params) => {

        setExtras({
            ...extras,
            [`key${Object.keys(extras).length}`]: { key: '', value: '', actived: true }
        });
        console.log(extras)
    }

    return (
        <Form onSubmit={handleSubmit} >
            <Form.Row>
                <Form.Group as={Col} controlId="formGridIdentity">
                    <Form.Label>Identity*</Form.Label>
                    <Form.Control value={formModel.identity} onChange={(e) => { setFormModel({ ...formModel, identity: e.target.value }) }} type="text" required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={formModel.name} onChange={(e) => { setFormModel({ ...formModel, name: e.target.value }) }} type="text" />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={formModel.email} onChange={(e) => { setFormModel({ ...formModel, email: e.target.value }) }} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" type="text" value={formModel.gender} onChange={(e) => { setFormModel({ ...formModel, gender: e.target.value }) }}  >
                        <option>Male</option>
                        <option>Female</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" value={formModel.phoneNumber} onChange={(e) => { setFormModel({ ...formModel, phoneNumber: e.target.value }) }} />
                </Form.Group>
            </Form.Row>
            <hr />
            <p>Extras</p>
            {
                Object.keys(extras).map((k, i) => {
                    return <Form.Row key={i} className={extras[k].actived ? 'extras-item-visible' : 'extras-item-hidden'}>
                        <Form.Group as={Col} md="5" controlId="formGridKey">
                            <Form.Label>Key</Form.Label>
                            <Form.Control type="text" value={extras[k].key} onChange={(e) => { setExtras({ ...extras, [k]: { ...extras[k], key: e.target.value } }) }} />
                        </Form.Group>

                        <Form.Group as={Col} md="5" controlId="formGridValue">
                            <Form.Label>Value</Form.Label>
                            <Form.Control type="text" value={extras[k].value} onChange={(e) => { setExtras({ ...extras, [k]: { ...extras[k], value: e.target.value } }) }} />
                        </Form.Group>
                        <Form.Group as={Col} md="2" controlId="formGridRemove">
                            <Form.Label></Form.Label><br />
                            <FiX className="extras-remove-item" size={32} onClick={() => { setExtras({ ...extras, [k]: { ...extras[k], actived: false } }) }} />
                        </Form.Group>
                    </Form.Row>
                })
            }
            <Button  onClick={handleAddExtras}>+</Button>

            <hr />
            <Button variant="success" className="float-right" type="submit">
                Add Contact
        </Button>
        </Form>
    )
}

export default ContactForm