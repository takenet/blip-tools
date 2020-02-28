import React, { useState } from "react"
import { Table, Button, Row, Col, Pagination } from "react-bootstrap";
import FilterForm from './FilterForm';
import { removeDuplicates, countIndex } from '../util';
import { FiUserPlus, FiSearch } from 'react-icons/fi';
import ContactModal from './ContactModal';

function ContactTable(props) {
    const data = removeDuplicates(props.data, props.minus);
    const [filterDisplay, setFilterDisplay] = useState(false)
    const [show, setShow] = useState(false);
    const [contactSelected, setContactSelected] = useState([]);

    const handlePagination = (index) => {
        props.setPagination(index);
    }
    const handleOpenModal = (contact) => {
        setContactSelected(contact);
        setShow(true);
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
            <ContactModal display={show} data={contactSelected} handleClose={() => setShow(false)} />
            <p>Todos Contatos</p>
            <Row>
                <Col md='9'>
                    <p>Clique sobre os contatos para visualizar todas as informações cadastradas</p>
                </Col>
                <Col md='3'>
                    <Button variant="secondary" block style={{ display: !filterDisplay ? '' : 'none' }} onClick={() => { setFilterDisplay(true) }}> <FiSearch /> Filtrar</Button>
                </Col>
            </Row>
            <Row>
                <Col md={!filterDisplay ? 12 : 8}>
                    <Table striped bordered hover  >
                        <thead>
                            <tr>
                                <th>ID de Usuário</th>
                                <th>Nome</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td onClick={() => { handleOpenModal(item) }} >{item.identity}</td>
                                        <td onClick={() => { handleOpenModal(item) }} >{item.name}</td>
                                        <td><Button variant="success" style={{ display: 'block', margin: 'auto' }}  onClick={() => props.handleAdd(item.identity)}> <FiUserPlus /> Adicionar</Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    {data.length === 0 ?
                        <td colSpan="3" style={{ background: 'gray' }}>
                            <div style={{ textDecorationColor: 'white', textAlign: 'center' }}> Sem registros</div>
                        </td>
                        :
                        <></>
                    }
                    <div className="float-right">

                        < Pagination >
                            <Items />
                        </Pagination>

                    </div>
                </Col>
                <Col md={!filterDisplay ? 0 : 4}>
                    <FilterForm activated={filterDisplay} disable={() => setFilterDisplay(false)} filter={(filter) => { props.filter(filter); }} />
                </Col>
            </Row>

        </div >);

}


export default ContactTable