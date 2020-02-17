import React from "react"
import Table from 'react-bootstrap/Table';


function TableView(props) {
    const data = props.data;

    return (<>
        <p>Todas Listas</p>
        <Table striped bordered hover >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, i) => {
                    return (
                        <tr key={i}>
                            <>
                                <td>{i + 1}</td>
                                <td>{item}</td>
                            </>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    </>
    );
}

export default TableView