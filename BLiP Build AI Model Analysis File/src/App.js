import React, { useEffect, useState } from "react"
import "blip-toolkit/dist/blip-toolkit.css"
import { PageHeader } from "components/PageHeader"
import { CommonProvider } from "contexts/CommonContext"
import { PageTemplate } from "components/PageTemplate"
import { getIntents, getAnswers } from "api/axiosService"
import { Button, Form, Col, Spinner, Row } from "react-bootstrap"
import { BlipTable } from "components/BlipTable";
import CsvDownloader from "react-csv-downloader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const tableModel = [
        { label: "Text", key: "text" },
        { label: "Id", key: "id" },
    ];
    const columns = [
        {
            id: "text",
            displayName: "sep="
        },
        {
            id: "id",
            displayName: ""
        }
    ];

    const [key, setkey] = useState('');
    const [url, setUrl] = useState('');
    const [intents, setIntents] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [data, setData] = useState([]);
    const [selected, setSeleted] = useState([]);

    const [spinner, setSpinner] = useState({ visibility: false })

    const loadIntents = async () => {
        setIntents(await getIntents(key, url, handleError))
    }
    const loadData = async () => {
        setSeleted([]);
        let itens = [];
        for (const intent of intents) {
            itens.push(await getAnswers(key, url, intent.id))
        }
        setAnswers(itens)
        setSpinner({ visibility: false })
    }

    const buildTableBase = () => {
        let items = [];
        answers.forEach(e => {
            if (e) {
                let id = e.id;
                e.questions.forEach(i => {
                    items.push({ text: removeSeparator(i.text), id: id })
                })
            }
        })
        setData(items);
    }
    const removeSeparator = (text) => {
        return text.split(',').join('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSpinner({ visibility: true })
        setData([]);
        await loadIntents();
    }
    const handleError = () => {
        toast.error("Error to load intentions")
        setSpinner({ visibility: false })
    }


    useEffect(() => {
        if (intents)
            loadData();
    }, [intents])

    useEffect(() => {
        buildTableBase();
    }, [answers])
    const title = "BLiP Build AI Model Analysis File"

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
                            <Button className="float-right" type="submit">Load</Button>
                        </Form>
                        <div className="spinner" style={spinner.visibility ? { display: '' } : { display: "none" }}>
                            <Spinner animation="border" variant="info" />
                        </div>
                        <div style={data.length > 0 ? { visibility: '' } : { visibility: 'hidden' }}>
                            <BlipTable
                                idKey="text"
                                model={tableModel}
                                data={data}
                                canSelect={true}
                                onItemSelect={(item) => setSeleted(item)}
                                selectedItems={selected}
                                bodyHeight="1300px"
                                actions={[<CsvDownloader
                                    filename="MyExportModel"
                                    separator=","
                                    wrapColumnChar=""
                                    columns={columns}
                                    datas={selected}
                                    text="Export"
                                />]}
                            />
                        </div>
                    </div>

                </PageTemplate>
            </div>
        </CommonProvider >
    )
}

export default App