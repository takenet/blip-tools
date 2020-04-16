import React from "react"
import { Form } from "react-bootstrap";
import PropTypes from 'prop-types';


function ListSelect({ data, handleSelection, listSelected }) {
    const lists = data;
 
    
    return (

        <>
            <Form.Label>List</Form.Label>
            <Form.Control as="select" onChange={handleSelection} value={listSelected}>
                { listSelected=== "" && <option>Select a list</option>}
                {lists.map((item, i) => {
                    return (<option key={i} value={item}>{item}</option>)
                })}
            </Form.Control>
        </>

    );
}

ListSelect.propTypes = {
    data: PropTypes.array.isRequired,
    handleSelection: PropTypes.func.isRequired,
    listSelected: PropTypes.string.isRequired,
}

export default ListSelect