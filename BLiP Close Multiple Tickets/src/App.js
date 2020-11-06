import React, { useState } from "react"
import "blip-toolkit/dist/blip-toolkit.css"
import { PageHeader } from "components/PageHeader"
import { CommonProvider } from "contexts/CommonContext"
import { PageTemplate } from "components/PageTemplate"
import { getOpenTickets, closeTicket } from "api/axiosService"
import { ProgressBar } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ItemModal from './projectComponents/ItemModal'
import CommandForm from './projectComponents/CommandForm'
import DataTable from './projectComponents/DataTable'





function App() {

    const [header, setHeader] = useState({});
    const [data, setData] = useState([]);
    const [selected, setSeleted] = useState([]);
    const [progress, setProgress] = useState();
    const [closingProgress, setClosingProgress] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [modal, setModal] = useState({ position: 0, display: false, item: {} });


    const handleSubmit = async (event, header) => {
        event.preventDefault();
        loadData(header);
    }




    const loadData = async (header) => {
        setHeader(header)
        setData([]);
        setSeleted([]);
        setProgress({ visibility: true })
        setPercentage(0)
        setData(await getOpenTickets(header, handleError, setPercentage))
        setProgress({ visibility: false })
        setPercentage(0)
    }


    const handleError = (message) => {
        toast.error(message);

    }

    const handleClosing = async () => {
        let successNumber = 0;
        setPercentage(0);
        setClosingProgress(true)

        let percentage = 0;
        for (const item of selected) {
            if (await closeTicket(header.key, header.url, item.id, handleError)) {
                successNumber++
            }
            percentage = ((successNumber / selected.length) * 100);
            setPercentage(percentage.toFixed(2));
        }

        setPercentage(0)
        setClosingProgress(false)
        successNumber > 0 && toast.success(`${successNumber} ticket(s) closed`);
        await loadData(header);
    }


    const title = "Blip - Close Multiple Tickets"

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

                        <CommandForm handleSubmit={handleSubmit} buttonDisable={progress} />

                        <div style={progress && progress.visibility ? { display: '' } : { display: "none" }}>
                            <ProgressBar now={percentage} label={`${percentage}%`} />
                        </div>
                        <div style={closingProgress ? { display: '' } : { display: "none" }}>
                            <ProgressBar now={percentage} variant="danger" label={`${percentage}%`} />
                        </div>
                        <DataTable
                            data={data}
                            handleClosing={handleClosing}
                            progress={progress}
                            selected={selected}
                            setSeleted={setSeleted}
                            setModal={setModal}
                            disableButton={closingProgress}
                        />
                    </div>

                </PageTemplate>
            </div>
        </CommonProvider >
    )
}

export default App