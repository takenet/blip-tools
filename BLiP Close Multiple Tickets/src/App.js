import React, { useState } from "react"
import "blip-toolkit/dist/blip-toolkit.css"
import { PageHeader } from "components/PageHeader"
import { CommonProvider } from "contexts/CommonContext"
import { PageTemplate } from "components/PageTemplate"
import { getOpenTickets, closeTicket } from "api/axiosService"
import { Button, Form, Col, Row, ProgressBar } from "react-bootstrap"
import { BlipTable } from "components/BlipTable";
import { sortData } from './util';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ItemModal from './projectComponents/ItemModal'


const tableModel = [
    { label: "Sequential Id", key: "sequentialId" },
    { label: "Customer Identity", key: "customerIdentity" },
    { label: "Team", key: "team" },
    { label: "Open Date", key: "openDate" },
    { label: "Last Client Message Date", key: "lastMessageDate" },
];


function App() {

    const [key, setkey] = useState('');
    const [url, setUrl] = useState('');
    const [data, setData] = useState([]);
    const [selected, setSeleted] = useState([]);
    const [progress, setProgress] = useState();
    const [percentage, setPercentage] = useState(0);
    const [modal, setModal] = useState({ position: 0, display: false, item: {} });

    const handleSubmit = async (event) => {
        event.preventDefault();
        loadData();
    }




    const loadData = async () => {
        setData([]);
        setSeleted([]);
        setProgress({ visibility: true })
        setPercentage(0)
        setData(await getOpenTickets(key, url, handleError, setPercentage))
        setProgress({ visibility: false })
        setPercentage(0)
    }


    const handleError = (message) => {
        toast.error(message);

    }

    const handleClosing = async () => {
        let successNumber = 0;

        for (const item of selected) {
            if (await closeTicket(key, url, item.id, handleError)) {
                successNumber++
            }
        }
        successNumber > 0 && toast.success(`${successNumber} ticket(s) closed`);
        await loadData();
    }


    const title = "BLiP - Close Multiple Tickets"

    return (
        <CommonProvider>
            <div id="main" className="App">

                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <PageHeader title={title} />
                <PageTemplate title={title}>
                    <div id="tab-nav" >
                        <ItemModal position={modal.position} display={modal.display} data={modal.item} handleClose={() => setModal({ ...modal, display: false })} />
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} >
                                <Form.Label column sm="3">Url to send commands</Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" required placeholder="https://http.msging.net/commands" value={url} onChange={(e) => { setUrl(e.target.value) }} /><br />
                                </Col>

                                <Form.Label column sm="3">Header authentication (Authorization)</Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" required placeholder="Key bGFiqpolfyaW9u..." value={key} onChange={(e) => { setkey(e.target.value) }} />
                                </Col>

                            </Form.Group>
                            <Button className="float-right" type="submit" >Load</Button>
                        </Form>
                        <div style={progress && progress.visibility ? { display: '' } : { display: "none" }}>
                            <ProgressBar now={percentage} label={`${percentage}%`} />
                        </div>
                        <div style={progress && !progress.visibility ? { visibility: '' } : { visibility: 'hidden' }} className="tickets-box">

                            <h3>Open Tickets</h3>
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
                                actions={[<Button key='123' variant="danger" onClick={handleClosing}>Close</Button>]}
                            />
                        </div>
                    </div>

                </PageTemplate>
            </div>
        </CommonProvider >
    )
}

export default App