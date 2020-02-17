import React, { useState } from "react"

function ListSelect(props) {
    const lists = props.data;


    return (
        <select className="browser-default custom-select" onChange={props.handleSelection} value={props.listSelected}>
            <option>Selecione uma lista</option>
            {lists.map((item, i) => {
                return (<option key={i} value={item}>{item}</option>)
            })}
        </select>
    );
}


export default ListSelect