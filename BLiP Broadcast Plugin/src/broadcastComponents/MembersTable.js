import React from "react"
import { Button, Pagination, Table, Alert } from 'react-bootstrap';
import { FiUserMinus } from 'react-icons/fi';
import { countIndex } from '../util';

function MembersTable(props) {
    const members = props.data;

    const handlePagination = (index) => {
        props.setPagination(index);
    }
    const Items = () => {
        let items = [];
        if (countIndex(props.total) > 1) {
            for (let index = 0; index < countIndex(props.total); index++) {
                items.push(
                    <Pagination.Item key={index + 1} active={index + 1 === (props.pagination + 1)} onClick={() => { handlePagination(index) }}>
                        {index + 1}
                    </Pagination.Item> ,
                );
            }
        }
        return items;
    }
    return (
        <div >
            <br /> <br />
            <p>Todos Membros</p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {members.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{(props.pagination * 20) + i + 1}</td>
                                <td>{item}</td>
                                <td><Button variant="danger" style={{ float: 'center' }} onClick={() => props.handleRemove(item)}> <FiUserMinus /> Retirar</Button></td>
                            </tr>
                        )
                    })}
                    {members.length === 0 ?
                        <td colSpan="3" style={{ background: 'gray', textDecorationColor: 'white', textAlign: 'center' }}>
                            Sem registros
                        </td>
                        :
                        <></>
                    }
                </tbody>
            </Table>

            <div className="float-right">

                < Pagination >
                    <Items />
                </Pagination>

            </div>
        </div>
    );
}

export default MembersTable