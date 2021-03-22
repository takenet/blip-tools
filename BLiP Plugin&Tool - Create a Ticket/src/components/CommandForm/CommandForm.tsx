import React, { useState } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { FiHelpCircle } from 'react-icons/fi'
import PropTypes from 'prop-types'

const CommandForm = ({ handleSubmit }) => {
  const [key, setkey] = useState('')

  const [url, setUrl] = useState('')

  return (
    <Form
      style={{ padding: '10px 0px' }}
      onSubmit={(e) => {
        handleSubmit(e, { key, url })
      }}
    >
      <Form.Group as={Row}>
        <Form.Label column sm="3">
          Url to send commands
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            required
            placeholder="https://http.msging.net/commands"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
            }}
          />
          <br />
        </Col>
        <Col sm="1">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://forum.blip.ai/t/preciso-de-ajuda-com-blip-close-multiple-tickets/8634"
          >
            <FiHelpCircle />
          </a>
        </Col>

        <Form.Label column sm="3">
          Header authentication (Authorization)
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            required
            placeholder="Key bGFiqpolfyaW9u..."
            value={key}
            onChange={(e) => {
              setkey(e.target.value)
            }}
          />
          <Form.Text className="text-muted" style={{ padding: '0px 1px' }}>
            If you are using the router architecture always fill in the{' '}
            <b>customer service subbot key</b>
          </Form.Text>
        </Col>
        <Col sm="1">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://help.blip.ai/hc/pt-br/articles/360058712774-Como-encontrar-a-API-KEY-do-meu-bot-"
          >
            <FiHelpCircle />
          </a>
        </Col>
      </Form.Group>

      <Button className="float-right" type="submit">
        Load
      </Button>
    </Form>
  )
}

CommandForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default CommandForm
