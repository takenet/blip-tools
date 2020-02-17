import React, { useState } from "react"
import { Row, Col, Form, Card, Button } from "react-bootstrap";
import { FiSearch } from 'react-icons/fi';
import { MdClearAll } from 'react-icons/md';

function FilterForm(props) {
    const [filter, setFilter] = useState({
        prop: 'name',
        condition: 'substringof',
        value: ''
    });
    const [condition, setCondition] = useState(false);


    const changeProp = (e) => {
        // if (e.target.value === 'date') {
        //     setCondition(true)
        //     setFilter({ ...filter, prop: e.target.value, condition: 'inverval' });
        // } else {
        setCondition(false)
        setFilter({ ...filter, prop: e.target.value });
        // }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.filter(filter);


    }
    const hideForm = () => {
        props.filter();
        props.disable();
    }



    return (<div style={{ display: props.activated ? '' : 'none' }} >

        <Card>
            <Card.Header>Filtro</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Label>Propriedade</Form.Label>
                            <Form.Control as="select" value={filter.prop} onChange={changeProp}>
                                <option value="name">Nome</option>
                                <option value="email">Email</option>
                                <option value="phonenumber">Telefone</option>
                                <option value="city">Cidade</option>
                                <option value="identity">ID de Usuário</option>
                                <option value="extras">Extras</option>
                                {/* <option value="date">Data da última mensagem</option> */}
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Label>Condição</Form.Label>
                            <Form.Control as="select" value={filter.condition} onChange={(e) => { setFilter({ ...filter, condition: e.target.value }) }} disabled={condition} >
                                {condition ?
                                    // (<option value="interval" selected>Intervalo</option>)
                                    <></>
                                    :
                                    (<>
                                        <option value="substringof">Contém</option>
                                        <option value="not%20substringof">Não Contém</option>
                                        <option value="eq">Igual a</option>
                                        <option value="ne">Diferente de</option>
                                    </>)}

                            </Form.Control>
                        </Col>
                    </Row>
                    <br />

                    {condition ?
                        (<> <Row>
                            <Col>
                                <Form.Label>De</Form.Label>
                                <Form.Control type="date" value={filter.inicialDate} onChange={(e) => { setFilter({ ...filter, initialDate: e.target.value }) }} required />
                            </Col>
                            <Col>
                                <Form.Label>Até</Form.Label>
                                <Form.Control type="date" value={filter.finalDate} onChange={(e) => { setFilter({ ...filter, finalDate: e.target.value }) }} required />
                            </Col>
                        </Row>
                        </>)
                        :
                        (<Form.Control type="text" placeholder="Valor" value={filter.value} onChange={(e) => { setFilter({ ...filter, value: e.target.value }) }} required />)
                    }
                    <br />
                    <Row>
                        <Col>
                            <Button type="submit"> <FiSearch /> Filtrar</Button>
                        </Col>
                        <Col>
                            <Button style={{ float: 'right' }} variant="secondary" onClick={hideForm}> <MdClearAll />Limpar Filtro</Button>
                        </Col>
                    </Row>

                </Form>
            </Card.Body>
        </Card>


    </div>)
}

export default FilterForm