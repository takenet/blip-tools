import React from 'react'
import 'blip-toolkit/dist/blip-toolkit.css'
import PropTypes from 'prop-types'
import { Form, Col, Card } from 'react-bootstrap'

function dataCard({ data }) {
  return data ? (
    <Card border="success">
      <Card.Body>
        <Form>
          <h5>Ticket Information</h5>
          {Object.keys(data).map((k) => {
            return (
              <Form.Row key={k}>
                <Form.Group as={Col} md="5" controlId="formGridKey">
                  <Form.Label>{k}</Form.Label>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="formGridKey">
                  <Form.Control
                    type="text"
                    value={
                      typeof data[k] !== 'object'
                        ? data[k]
                        : JSON.stringify(data[k])
                    }
                    required
                    readOnly={true}
                  />
                </Form.Group>
              </Form.Row>
            )
          })}
        </Form>
      </Card.Body>
    </Card>
  ) : (
    <></>
  )
}
dataCard.propTypes = {
  data: PropTypes.object.isRequired,
}

export default dataCard
