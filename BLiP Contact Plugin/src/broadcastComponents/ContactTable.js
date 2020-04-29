import React, { useState } from "react"
import { Button, Row, Col, Pagination } from "react-bootstrap";
import FilterForm from './FilterForm';
import { countIndex, sortData, replaceDelimiter } from '../util';
import {  FiSearch } from 'react-icons/fi';
import ContactModal from './ContactModal';
import { BlipTable } from "components/BlipTable";
import PropTypes from 'prop-types';
import CsvDownload from 'react-json-to-csv';;

const tableModel = [
    { label: "Identity", key: "identity" },
    { label: "Name", key: "name" },
    { label: "Source", key: "source" },
];


function ContactTable({ data, onApplyFilter, total, pagination, onChangePagination, fileName }) {

    const [filterDisplay, setFilterDisplay] = useState(false)
    const [modal, setModal] = useState({ position: 0, display: false, contact: {} });
    const [sort, setSort] = useState([
        { property: "identity", order: "asc" },
        { property: "name", order: "asc" },
        { property: "source", order: "asc" }]
    );
    const [selected, setSeleted] = useState([]);

    const Items = () => {
        let items = [];
        if (countIndex(total) > 1) {
            for (let index = 0; index < countIndex(total); index++) {
                items.push(
                    <Pagination.Item key={index + 1} active={index + 1 === (pagination + 1)} onClick={() => { onChangePagination(index) }}>
                        {index + 1}
                    </Pagination.Item> ,
                );
            }
        }
        return items;
    }


    return (
        <div >
            <ContactModal position={modal.position} display={modal.display} data={modal.contact} handleClose={() => setModal({ ...modal, display: false })} />
            <h5>Contacts</h5>
            <Row>
                <Col md='9'>
                    <p> Click on contacts to see their information </p>
                </Col>
                <Col md='3'>
                    <Button block style={{ display: !filterDisplay ? '' : 'none' }} onClick={() => { setFilterDisplay(true) }}> <FiSearch /> Filter</Button>
                </Col>
            </Row>
            <Row>
                <Col md={!filterDisplay ? 12 : 8}>

                    <BlipTable
                        idKey="identity"
                        model={tableModel}
                        data={data}
                        onItemSelect={(item) => setSeleted(item)}
                        canSelect={true}
                        sort={sort}
                        onItemClick={(event, item) => { setModal({ position: event.nativeEvent.clientY, display: true, contact: item }); }}
                        onSortSet={(item) => { sortData(data, item) }}
                        bodyHeight="1300px"
                        selectedItems={selected}
                        actions={[<CsvDownload className="btn btn-success" data={replaceDelimiter(selected)} filename={`${fileName}.csv`}>Export</CsvDownload>]}
                    />
                    <div className="float-right">

                        < Pagination className="pagination">
                            <Items />
                        </Pagination>

                    </div>
                </Col>
                <Col md={!filterDisplay ? 0 : 4}>
                    <FilterForm activated={filterDisplay} disable={() => setFilterDisplay(false)} applyFilter={(filter) => { onApplyFilter(filter); }} />
                </Col>
            </Row>

        </div >);

}
ContactTable.propTypes = {

    data: PropTypes.array.isRequired,
    setPagination: PropTypes.func.isRequired,
    total: PropTypes.number,
    pagination: PropTypes.number.isRequired,
    handleAdd: PropTypes.func.isRequired,
    filter: PropTypes.func.isRequired,
}

export default ContactTable