import React, { useState } from "react";
import CsvForm from "./CsvForm";
import { BlipTable } from "components/BlipTable";
import { sortData } from '../util';
import ContactModal from './ContactModal';
import { Button } from "react-bootstrap";

function ImportContact({ onAdd }) {

    const [data, setData] = useState({ header: {}, items: [], selected: [], model: [] });
    const [sort, setSort] = useState([
        { property: "identity", order: "asc" },
        { property: "name", order: "asc" },
        { property: "source", order: "asc" }]
    );
    const [modal, setModal] = useState({ position: 0, display: false, contact: {} });

    const handleLoadData = (header, items, model) => {
        setData({ header: header, items: items, selected: [], model: model })
    }
    const handleImportData = () => {
        onAdd(data.selected);
    }


    return <div>
        <CsvForm OnLoadData={handleLoadData} />
        <ContactModal position={modal.position} display={modal.display} data={modal.contact} handleClose={() => setModal({ ...modal, display: false })} />
        <BlipTable
            idKey="identity"
            model={data.model}
            data={data.items}
            onItemSelect={(item) => setData({ ...data, selected: item })}
            canSelect={true}
            sort={sort}
            onItemClick={(event, item) => { setModal({ position: event.nativeEvent.clientY, display: true, contact: item }); }}
            onSortSet={(item) => { sortData(data.items, item) }}
            bodyHeight="1300px"
            selectedItems={data.selected}
            actions={[<Button variant="success" onClick={handleImportData}>Adicionar</Button>]}
        />
    </div>
}



export default ImportContact