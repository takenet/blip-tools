import React, { useState } from 'react'
import { Row, Col, Form, Card, Button } from 'react-bootstrap'
import { FiSearch } from 'react-icons/fi'
import { MdClearAll } from 'react-icons/md'
import PropTypes from 'prop-types'

function FilterForm({ applyFilter, disable, activated }) {
  const [filter, setFilter] = useState({
    prop: 'name',
    condition: 'substringof',
    value: '',
  })

  const changeProp = (e) => {
    setFilter({ ...filter, prop: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    applyFilter(filter)
  }
  const hideForm = () => {
    applyFilter()
    disable()
  }

  return (
    <div style={{ display: activated ? '' : 'none' }}>
      <Card>
        <Card.Header>Filter</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="medium-padding-bottom">
              <Col>
                <Form.Label>Property</Form.Label>
                <Form.Control
                  as="select"
                  value={filter.prop}
                  onChange={changeProp}
                >
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="phonenumber">Phone</option>
                  <option value="city">City</option>
                  <option value="identity">Identity</option>
                  <option value="extras">Extras</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Label>Condition</Form.Label>
                <Form.Control
                  as="select"
                  value={filter.condition}
                  onChange={(e) => {
                    setFilter({ ...filter, condition: e.target.value })
                  }}
                >
                  <option value="substringof">Contains</option>
                  <option value="not%20substringof">Not contain</option>
                  <option value="eq">Equal</option>
                  <option value="ne">Different than</option>
                  <option value="startswith">Starts with</option>
                </Form.Control>
              </Col>
            </Row>

            <Form.Control
              type="text"
              placeholder="Valor"
              value={filter.value}
              onChange={(e) => {
                setFilter({ ...filter, value: e.target.value })
              }}
              required
            />

            <Row className="medium-padding-top">
              <Col>
                <Button type="submit">
                  {' '}
                  <FiSearch /> Filter
                </Button>
              </Col>
              <Col>
                <Button
                  style={{ float: 'right' }}
                  variant="secondary"
                  onClick={hideForm}
                >
                  {' '}
                  <MdClearAll />
                  Clear Filter
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
FilterForm.propTypes = {
  applyFilter: PropTypes.func.isRequired,
  disable: PropTypes.func.isRequired,
  activated: PropTypes.bool.isRequired,
}
export default FilterForm
