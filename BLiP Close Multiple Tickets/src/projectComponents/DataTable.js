import React from 'react'
import { Button} from "react-bootstrap"
import { BlipTable } from "components/BlipTable";
import { sortData } from '../util';

const tableModel = [
    { label: "Sequential Id", key: "sequentialId" },
    { label: "Customer Identity", key: "customerIdentity" },
    { label: "Team", key: "team" },
    { label: "Open Date", key: "openDate" },
    { label: "Status", key: "status" },
    { label: "Last Client Message Date", key: "lastMessageDate" },
];
const DataTable = ({
    data,
    handleClosing,
    progress,
    selected,
    setSeleted,
    setModal, 
    disableButton
}) => {
    
    return (
        <div style={progress && !progress.visibility ? { visibility: '' } : { visibility: 'hidden' }} className="tickets-box">

            <h3>Tickets</h3>
            <p> Click on tickets to see their information </p>

            <BlipTable
                idKey="id"
                model={tableModel}
                data={data}
                canSelect={true}
                sort={{}}
                onSortSet={(item) => { sortData(data, item) }}
                onItemClick={(event, item) => { setModal({ position: event.nativeEvent.clientY, display: true, item: item }); }}
                onItemSelect={(item) => setSeleted(item)}
                selectedItems={selected}
                bodyHeight="1300px"
                actions={[<Button key='123' variant="danger" disabled={disableButton ? true : false} onClick={handleClosing}>Close</Button>]}
            />
        </div>
    )
}

export default DataTable