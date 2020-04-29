import React, { useEffect, useState } from "react"
import "blip-toolkit/dist/blip-toolkit.css"
import { getApplication } from "./api/applicationService"
import { getContacts, addContactCollections, addContact } from "./api/serviceController"
import { withLoading } from "./api/commomService"
import { PageHeader } from "components/PageHeader"
import { CommonProvider } from "contexts/CommonContext"
import { PageTemplate } from "components/PageTemplate"
import { BlipTabs } from 'blip-toolkit'
import ContactTable from './broadcastComponents/ContactTable';
import ImportContact from './broadcastComponents/ImportContact';
import ContactForm from './broadcastComponents/ContactForm';

function App() {
    const [application, setApplication] = useState({});
    const [contacts, setContacts] = useState({
        data: { total: 0, items: [] },
        filter: {},
        pagination: 0
    });

    const handleOnChangePagination = async (index) => {
        withLoading(async () => { setContacts({ ...contacts, pagination: index, data: await getContacts(index, contacts.filter) }); })
    };
    const handleApplyFilter = async (newFilter) => {
        withLoading(async () => {
            setContacts({ pagination: 0, data: await getContacts(0, newFilter), filter: newFilter })
        });
    };

    const handleContactCollectionAdd = (contacts) => {
        withLoading(async () => {
            addContactCollections(contacts);
        });
    }
    const handleContactAdd = (contact) => {
        withLoading(async () => {
            addContact(contact);
        });
    }



    const fetchApi = async () => {
        setApplication(await getApplication())
        setContacts({ ...contacts, data: (await getContacts(contacts.pagination)) })
    }

    useEffect(() => {
        withLoading(async () => {
            new BlipTabs('tab-nav')
            await fetchApi()
        })
    }, [])

    const title = "Contact Plugin"

    return (
        <CommonProvider>
            <div id="main" className="App">
                <PageHeader title={title} />
                <PageTemplate title={title}>
                    <div id="tab-nav" className="bp-tabs-container">
                        <ul className="bp-tab-nav">
                            {/* Add contatcs */}
                            <li>
                                <a href="#" data-ref="add">Add/Update Contacts</a>
                            </li>
                            <li>
                                <a href="#" data-ref="export">Export Contacts</a>
                            </li>
                            <li>
                                <a href="#" data-ref="import">Import Contacts</a>
                            </li>
                        </ul>
                        <div className="bp-tab-content fl w-100" data-ref="add">
                            <ContactForm onAdd={handleContactAdd} />
                        </div>
                        <div className="bp-tab-content fl w-100" data-ref="export">
                            <ContactTable
                                total={contacts.data.total}
                                data={contacts.data.items}
                                onApplyFilter={handleApplyFilter}
                                pagination={contacts.pagination}
                                onChangePagination={handleOnChangePagination}
                                fileName={application.name}
                            />
                        </div>

                        <div className="bp-tab-content fl w-100" data-ref="import">
                            <ImportContact onAdd={handleContactCollectionAdd} />
                        </div>
                    </div>
                </PageTemplate>
            </div>
        </CommonProvider >
    )
}

export default App