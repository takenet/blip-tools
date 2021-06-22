import React from 'react'
import { Row, Button, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'

function FileSelect({ handleAddFile }) {
  const [file, setFile] = React.useState('')
  function handleUpload(event) {
    setFile(event.target.files[0])
  }

  return (
    <>
      <hr />
      <h5>Import contacts</h5>
      <h7> Choose the .txt file with all the contact's identity on blip </h7>
      <Row>
        <Col sm="7">
          <input
            class="file-upload"
            type="file"
            onChange={handleUpload}
            accept=".txt"
          />
        </Col>
        <Col sm="2">
          <Button
            variant="success"
            type="submit"
            disabled={!file}
            onClick={() => handleAddFile(file)}
          >
            Import
          </Button>
        </Col>
      </Row>
    </>
  )
}

FileSelect.propTypes = {
  handleAddFile: PropTypes.func.isRequired,
}

export default FileSelect
