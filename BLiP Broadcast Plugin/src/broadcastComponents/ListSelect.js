import React, { useState } from "react"
import { Form } from "react-bootstrap";
function ListSelect(props) {
    const lists = props.data;


    return (

        <>
            <Form.Label>Lista Selecionada</Form.Label>
            <Form.Control as="select" onChange={props.handleSelection} value={props.listSelected}>
                <option>Selecione uma lista</option>
                {lists.map((item, i) => {
                    return (<option key={i} value={item}>{item}</option>)
                })}
            </Form.Control>
        </>

    );
}


export default ListSelect