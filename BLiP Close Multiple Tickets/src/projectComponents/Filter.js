import React from "react"
import { Row, Col, Form } from "react-bootstrap"
import PropTypes from 'prop-types'

function Filter({ display = false,  onChange}) {

const [filter, setFilter] = useState({});
const handleSubmit = (event) => {
    
}



    return (
        <Form onSubmit={handleSubmit}>
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
        <Button className="float-right" type="submit" >Load</Button>
    </Form>
    );
}


ModalView.propTypes = {
    onChange: PropTypes.number.isRequired,
    display: PropTypes.bool.isRequired,
}

export default ModalView 