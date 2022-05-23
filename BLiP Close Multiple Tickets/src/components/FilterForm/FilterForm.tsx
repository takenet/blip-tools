import React, { useState } from 'react'
import { Button, Form, Col, Card } from 'react-bootstrap'
import { AiOutlineCloseSquare, AiOutlineFilter } from 'react-icons/ai'
import PropTypes from 'prop-types'

const STATUS = {
  CLOSED_CLIENT: 'closedClient',
  WAITING: 'waiting',
  OPEN: 'open',
  CLOSED_BY_INACTIVITY: 'closedClientInactivity',
}

export const FilterForm = ({
  handleSubmit,
  data,
  handleChange,
}): JSX.Element => {
  const [filterDisplay, setFilterDisplay] = useState(false)

  const handleStatusChange = (status: string) => {
    handleChange({
      ...data,
      status: {
        closedClient: false,
        waiting: false,
        open: false,
        closedClientInactivity: false,
        [status]: true,
      },
    })
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <Button
        variant="secondary"
        style={{
          display: !filterDisplay ? '' : 'none',
          paddingLeft: '100px',
          paddingRight: '100px',
        }}
        className="float-right"
        onClick={() => {
          setFilterDisplay(!filterDisplay)
        }}
      >
        {' '}
        <AiOutlineFilter /> Filter
      </Button>
      <div style={{ display: filterDisplay ? '' : 'none' }}>
        <Card border="dark">
          <Card.Header as="h5">
            Filter
            <Button
              className="float-right"
              variant="link"
              onClick={() => {
                setFilterDisplay(false)
              }}
            >
              <AiOutlineCloseSquare size="28" />
            </Button>
          </Card.Header>
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Status</Form.Label>
                <Form.Check
                  type="radio"
                  label="ClosedClient"
                  checked={data.status.closedClient}
                  onChange={(e) => {
                    handleStatusChange(STATUS.CLOSED_CLIENT)
                  }}
                />
                <Form.Check
                  type="radio"
                  label="Waiting"
                  checked={data.status.waiting}
                  onChange={(e) => {
                    handleStatusChange(STATUS.WAITING)
                  }}
                />
                <Form.Check
                  type="radio"
                  label="Closed by Client Inactivity"
                  checked={data.status.closedClientInactivity}
                  onChange={(e) => {
                    handleStatusChange(STATUS.CLOSED_BY_INACTIVITY)
                  }}
                />
                <Form.Check
                  type="radio"
                  label="Open"
                  checked={data.status.open}
                  onChange={(e) => {
                    handleStatusChange(STATUS.OPEN)
                  }}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Skip</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  value={data.pagination.skip}
                  onChange={(e) => {
                    handleChange({
                      ...data,
                      pagination: { ...data.pagination, skip: e.target.value },
                    })
                  }}
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Take</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={data.pagination.take}
                  onChange={(e) => {
                    handleChange({
                      ...data,
                      pagination: { ...data.pagination, take: e.target.value },
                    })
                  }}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Customer Identity</Form.Label>
                <Form.Control
                  type="text"
                  value={data.identities.customer}
                  placeholder="Ex: 1656325099@telegram.gw.msging.net"
                  onChange={(e) => {
                    handleChange({
                      ...data,
                      identities: {
                        ...data.identities,
                        customer: e.target.value,
                      },
                    })
                  }}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Agent Identity</Form.Label>
                <Form.Control
                  type="text"
                  value={data.identities.agent}
                  onChange={(e) => {
                    handleChange({
                      ...data,
                      identities: { ...data.identities, agent: e.target.value },
                    })
                  }}
                  placeholder="Ex: johndoe%40gmail.com@blip.ai"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Storage Date</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => {
                    handleChange({
                      ...data,
                      dates: {
                        ...data.dates,
                        storage: {
                          ...data.dates.storage,
                          select: e.target.value,
                        },
                      },
                    })
                  }}
                >
                  <option>{'<'}</option>
                  <option>{'>'}</option>
                </Form.Control>
                <Form.Control
                  type="datetime-local"
                  onChange={(e) => {
                    handleChange({
                      ...data,
                      dates: {
                        ...data.dates,
                        storage: {
                          ...data.dates.storage,
                          date: `${e.target.value}`,
                        },
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Open Date</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => {
                    handleChange({
                      ...data,
                      dates: {
                        ...data.dates,
                        open: { ...data.dates.open, select: e.target.value },
                      },
                    })
                  }}
                >
                  <option>{'<'}</option>
                  <option>{'>'}</option>
                </Form.Control>
                <Form.Control
                  type="datetime-local"
                  onChange={(e) => {
                    handleChange({
                      ...data,
                      dates: {
                        ...data.dates,
                        open: {
                          ...data.dates.open,
                          date: `${e.target.value}`,
                        },
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Status Date</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => {
                    handleChange({
                      ...data,
                      dates: {
                        ...data.dates,
                        status: {
                          ...data.dates.status,
                          select: e.target.value,
                        },
                      },
                    })
                  }}
                >
                  <option>{'<'}</option>
                  <option>{'>'}</option>
                </Form.Control>
                <Form.Control
                  type="datetime-local"
                  onChange={(e) => {
                    handleChange({
                      ...data,
                      dates: {
                        ...data.dates,
                        status: {
                          ...data.dates.status,
                          date: `${e.target.value}`,
                        },
                      },
                    })
                  }}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Last Client Message Date</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => {
                    handleChange({
                      ...data,
                      dates: {
                        ...data.dates,
                        lastMessageDate: {
                          ...data.dates.lastMessageDate,
                          select: e.target.value,
                        },
                      },
                    })
                  }}
                >
                  <option>{'<'}</option>
                  <option>{'>'}</option>
                </Form.Control>
                <Form.Control
                  type="datetime-local"
                  onChange={(e) => {
                    handleChange({
                      ...data,
                      dates: {
                        ...data.dates,
                        lastMessageDate: {
                          ...data.dates.lastMessageDate,
                          date: `${e.target.value}`,
                        },
                      },
                    })
                  }}
                />
              </Form.Group>
            </Form.Row>
            <Button type="reset" variant="danger">
              Clear Fields
            </Button>
            <Button className="float-right" type="submit">
              Load
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Form>
  )
}

FilterForm.propTypes = {
  data: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}
