import React, { useEffect, useState } from "react"
import "blip-toolkit/dist/blip-toolkit.css"
import { PageHeader } from "components/PageHeader"
import { CommonProvider } from "contexts/CommonContext"
import { PageTemplate } from "components/PageTemplate"
import { getIntents, getAnswers } from "api/axiosService"
import { Button, Form, Col, Spinner } from "react-bootstrap"
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
    const [intents, setIntents] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [data, setData] = useState([]);
    const [selected, setSeleted] = useState([]);

    const [spinner, setSpinner] = useState({ visibility: false })

    const loadIntents = async () => {
        setIntents(await getIntents(key, handleError))
    }
    const loadData = async () => {
        let itens = [];
        for (const intent of intents) {
            itens.push(await getAnswers(key, intent.id))
        }
        setAnswers(itens)
        setSpinner({ visibility: false })
    }

    const buildTableBase = () => {
        let items = [];
        answers.forEach(e => {
            let id = e.id;
            e.questions.forEach(i => {
                items.push({ text: i.text, id: id })
            })
        })
        setData(items);
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
                            <Form.Group >
                                <Form.Row className="align-items-center">
                                    <Col md="7">
                                        <Form.Control type="text" required placeholder="Key bGFiqpolfyaW9u..." value={key} onChange={(e) => { setkey(e.target.value) }} />
                                    </Col>
                                    <Col md="auto">
                                        <Button type="submit" >Load</Button>
                                    </Col>
                                </Form.Row>
                            </Form.Group>
                        </Form>
                        <div  style={spinner.visibility ? { display: '', textAlign: "center" } : { display: "none" , textAlign: "center"}}>
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