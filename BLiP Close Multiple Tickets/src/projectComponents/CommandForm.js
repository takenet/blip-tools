import React, { useState } from 'react'
import { Button, Form, Col, Row } from "react-bootstrap"
import { FiSearch } from 'react-icons/fi';

const CommandForm = ({
    handleSubmit,
    buttonDisable
}) => {
    const [key, setkey] = useState('');
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState({ waiting: false, closedByInactivity: false, open: true });
    const [pagination, setPagination] = useState({ skip: 0, take: 5000 });
    const [identities, setIdentities] = useState({ agent: '', customer: '' });
    const [dates, setDates] = useState({ storage: { select: '<', date: '' }, open: { select: '<', date: '' }, status: { select: '<', date: '' }, lastMessageDate: { select: '<', date: '' } });
    const [filterDisplay, setFilterDisplay] = useState(false)

    return (
        <Form onSubmit={(e) => { handleSubmit(e, { key, url, status, pagination, identities, dates })}}>
            <Form.Group as={Row} >
                <Form.Label column sm="3">Url to send commands</Form.Label>
                <Col sm="9">
                    <Form.Control type="text" required placeholder="https://http.msging.net/commands" value={url} onChange={(e) => { setUrl(e.target.value) }} /><br />
                </Col>

                <Form.Label column sm="3">Header authentication (Authorization)</Form.Label>
                <Col sm="9">
                    <Form.Control type="text" required placeholder="Key bGFiqpolfyaW9u..." value={key} onChange={(e) => { setkey(e.target.value) }} />
                </Col>

            </Form.Group>
            <Button  variant="secondary" style={{ display: !filterDisplay ? '' : 'none' }} onClick={() => { setFilterDisplay(!filterDisplay)}}> <FiSearch /> Filter</Button>
            <div style={{display: filterDisplay ? '' : 'none' }}>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label >Status</Form.Label>
                    <Form.Check type='checkbox' label="Waiting" checked={status.waiting} onChange={(e) => { setStatus({ ...status, waiting: e.target.checked }) }} />
                    <Form.Check type='checkbox' label="Closed by client inactivity" checked={status.closedByInactivity} onChange={(e) => { setStatus({ ...status, closedByInactivity: e.target.checked }) }} />
                    <Form.Check type='checkbox' label="Open" checked={status.open} onChange={(e) => { setStatus({ ...status, open: e.target.checked }) }} />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label>Skip</Form.Label>
                    <Form.Control type="number" min='0' value={pagination.skip} onChange={(e) => { setPagination({ ...pagination, skip: e.target.value }) }} required />
                </Form.Group>
                <Form.Group as={Col} >
                    <Form.Label>Take</Form.Label>
                    <Form.Control type="number" min='1' value={pagination.take} onChange={(e) => { setPagination({ ...pagination, take: e.target.value }) }} required />
                </Form.Group>
            </Form.Row>
            
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Customer Identity</Form.Label>
                        <Form.Control type="text" value={identities.customer} onChange={(e) => { setIdentities({ ...identities, customer: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label>Agent Identity</Form.Label>
                        <Form.Control type="text" value={identities.agent} onChange={(e) => { setIdentities({ ...identities, agent: e.target.value }) }} placeholder='Ex: johndoe%40gmail.com@blip.ai' />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Storage Date</Form.Label>
                        <Form.Control as="select" onChange={(e) => { setDates({ ...dates, storage: { ...dates.storage, select: e.target.value } }) }}>
                            <option>{'<'}</option>
                            <option>{'>'}</option>
                        </Form.Control>
                        <Form.Control type="datetime-local" onChange={(e) => { setDates({ ...dates, storage: { ...dates.storage, date: `${e.target.value}:00.000Z` } }) }} />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Open Date</Form.Label>
                        <Form.Control as="select" onChange={(e) => { setDates({ ...dates, open: { ...dates.open, select: e.target.value } }) }} >
                            <option>{'<'}</option>
                            <option>{'>'}</option>
                        </Form.Control>
                        <Form.Control type="datetime-local" onChange={(e) => { setDates({ ...dates, open: { ...dates.open, date: `${e.target.value}:00.000Z` } }) }} />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Status Date</Form.Label>
                        <Form.Control as="select" onChange={(e) => { setDates({ ...dates, status: { ...dates.status, select: e.target.value } }) }}>
                            <option>{'<'}</option>
                            <option>{'>'}</option>
                        </Form.Control>
                        <Form.Control type="datetime-local" onChange={(e) => { setDates({ ...dates, status: { ...dates.status, date: `${e.target.value}:00.000Z` } }) }} />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Last Client Message Date</Form.Label>
                        <Form.Control as="select" onChange={(e) => { setDates({ ...dates, lastMessageDate: { ...dates.lastMessageDate, select: e.target.value } }) }}>
                            <option>{'<'}</option>
                            <option>{'>'}</option>
                        </Form.Control>
                        <Form.Control type="datetime-local" onChange={(e) => { setDates({ ...dates, lastMessageDate: { ...dates.lastMessageDate, date: `${e.target.value}:00.000Z` } }) }} />
                    </Form.Group>
                </Form.Row>
            </div>

            <Button className="float-right" type="submit" disabled={buttonDisable && buttonDisable.visibility ? true : false}>Load</Button>
        </Form>
    )
}

export default CommandForm