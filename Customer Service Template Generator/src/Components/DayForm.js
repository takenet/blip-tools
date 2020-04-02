import React, { useState, useEffect } from 'react';
import { Col, Form, Button, InputGroup } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { labelsForm } from '../Base/Labels.js';
import { errors } from '../Base/ErrosMessage.js';

function DayForm({ daysWeek, setDaysWeek }) {

    const [inputs, setInputs] = useState({
        day: '',
        start: "08:00",
        end: "18:00"
    })
    const [error, setError] = useState({
        active: false,
        message: ""
    });

    useEffect(() => { setError({ active: false, message: '' }) }, [inputs])

    useEffect(() => {
        let days = Object.keys(daysWeek).filter(key => daysWeek[key].active);

        if (days.length > 0)
            setInputs({ ...inputs, day: daysWeek[days[0]].name });
    }, [daysWeek])

    const SelectDays = () => {
        let items = [];

        Object.keys(daysWeek).forEach((key, i) => {
            if (daysWeek[key].active)
                items.push(<option key={i}>{daysWeek[key].name}</option>)
        })

        return items;
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        Object.keys(daysWeek).map((key) => {
            if (daysWeek[key].name === inputs.day)
                validate(daysWeek[key].workTime);

        }
        )
    }
    const validate = (workTime) => {
        if (inputs.start > inputs.end) {
            setError({ active: true, message: errors.higher });
            return;
        }


        for (let item of workTime) {
            if ((item.start <= inputs.start && inputs.start <= item.end) || (item.start <= inputs.end && inputs.end <= item.end)
                || (inputs.start <= item.start && item.start <= inputs.end) || (inputs.start <= item.end && item.end <= inputs.end)
            ) {
                setError({ active: true, message: errors.defined });
                return;
            }

        }


        workTime.push({ start: inputs.start, end: inputs.end });
        setDaysWeek({ ...daysWeek })
    }




    return (
        <>
            <Form noValidate onSubmit={handleSubmit} style={{ margin: '10px' }}>
                <Form.Row>
                    <Col md='4'>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label className={error.active ? "text-danger" : ''} >{labelsForm.select}</Form.Label>
                            <Form.Control className={error.active ? "is-invalid" : ''} as="select" value={inputs.day} onChange={(e) => { setInputs({ ...inputs, day: e.target.value }) }} required>
                                <SelectDays />

                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md='4'>
                        <Form.Group controlId="formGridEmail">
                            <Form.Label className={error.active ? "text-danger" : ''} >{labelsForm.inicialInput}</Form.Label>
                            <Form.Control className={error.active ? "is-invalid" : ''}
                                type="time" value={inputs.start} onChange={(e) => { setInputs({ ...inputs, start: e.target.value }) }} required />
                        </Form.Group>
                    </Col>
                    <Col md='4'>
                        <Form.Group controlId="formGridEmail">
                            <Form.Label className={error.active ? "text-danger" : ''} >{labelsForm.finalInput}</Form.Label>
                            <InputGroup>
                                <Form.Control className={error.active ? "is-invalid" : ''}
                                    type="time" value={inputs.end} onChange={(e) => { setInputs({ ...inputs, end: e.target.value }) }} required />

                                <Form.Control.Feedback type="invalid">
                                    {error.message}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Button style={{ float: 'right' }} variant="success" type="submit" >
                            <PlusSquare size={25} /> {labelsForm.button}  </Button>
                    </Col>

                </Form.Row>


            </Form>
        </>
    );
}

export default DayForm;