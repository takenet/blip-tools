import React, { useState, useEffect } from 'react'
import 'blip-toolkit/dist/blip-toolkit.css'
import PropTypes from 'prop-types'
import { Form, Col, Button, Card, Alert } from 'react-bootstrap'
import { isInside24hrsWindow } from './util'
import { AiOutlineWarning, AiOutlineEdit } from 'react-icons/ai'

function ContactCard({ data, onUpdate }) {
  const [isUpdatable, setIsUpdatable] = useState(false)
  const [contact, setContact] = useState(data)

  const MessageActiveAlert = () => {
    if (contact && !isInside24hrsWindow(contact.lastMessageDate))
      return (
        <Alert variant="danger">
          <AiOutlineWarning size="30" />
          If you create a ticket,{' '}
          <b>you can only chat by sending ative messages</b> because{' '}
          <b>the last message isn't in the 24 hours window.</b>
        </Alert>
      )
    else return <></>
  }
  useEffect(() => {
    setContact(data)
  }, [data])
  return (
    <Card border="info">
      <Card.Header as="h5">
        Contact Information{' '}
        <Button
          className="float-right"
          variant="link"
          onClick={() => {
            setIsUpdatable(!isUpdatable)
          }}
        >
          <AiOutlineEdit size="26" />
        </Button>
      </Card.Header>
      <Card.Body>
        <Form
          onSubmit={(e) => {
            onUpdate(e, contact)
          }}
        >
          <Form.Label>Contact Name</Form.Label>
          <Form.Control
            type="text"
            value={contact.name}
            onChange={(e) => {
              setContact({ ...contact, name: e.target.value })
            }}
            required
            readOnly={!isUpdatable}
          />
          <Form.Label>Contact Email</Form.Label>
          <Form.Control
            type="text"
            value={contact.email}
            onChange={(e) => {
              setContact({ ...contact, email: e.target.value })
            }}
            required
            readOnly={!isUpdatable}
          />
          <Form.Label>Last Message Date</Form.Label>
          <Form.Control
            type="text"
            value={contact.lastMessageDate}
            readOnly
            required
          />
          <MessageActiveAlert />

          <b>Extras</b>
          {contact.extras &&
            Object.keys(contact.extras).map((k) => {
              return (
                <Form.Row key={k}>
                  <Form.Group as={Col} md="6" controlId="formGridKey">
                    <Form.Label>{k}</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="formGridKey">
                    <Form.Control
                      type="text"
                      value={contact.extras[k]}
                      onChange={(e) => {
                        setContact({
                          ...contact,
                          extras: {
                            ...contact.extras,
                            [`${k}`]: e.target.value,
                          },
                        })
                      }}
                      required
                      readOnly={!isUpdatable}
                    />
                  </Form.Group>
                </Form.Row>
              )
            })}

          <Button
            className="float-right"
            variant="info"
            style={{ display: isUpdatable ? '' : 'none' }}
            type="submit"
          >
            Update
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

ContactCard.propTypes = {
  data: PropTypes.object.isRequired,
  onUpdate: PropTypes.elementType.isRequired,
}
export default ContactCard
