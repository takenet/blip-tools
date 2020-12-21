import React, { useEffect, useState } from "react"
import "blip-toolkit/dist/blip-toolkit.css"
import {
    getApplication, getLists, createList, getMembers, removeMemberCollection,
    getContacts, deleteCollectionLists, addMemberCollection
} from "./api/applicationService"
import { withLoading } from "./api/commomService"
import { PageHeader } from "components/PageHeader"
import { CommonProvider } from "contexts/CommonContext"
import { PageTemplate } from "components/PageTemplate"
import { BlipTabs } from 'blip-toolkit'
import ListsTable from './broadcastComponents/ListTable';
import ContactTable from './broadcastComponents/ContactTable';
import MembersTable from './broadcastComponents/MembersTable';
import ListSelect from './broadcastComponents/ListSelect';
import ListForm from './broadcastComponents/ListForm';

function App() {
    const [application, setApplication] = useState({});

    const [lists, setLists] = useState([]);

    const [listSelected, setListSelected] = useState('');

    //Members states
    const [members, setMembers] = useState({ total: 0, items: [] });
    const [membersPagination, setMembersPagination] = useState(0);

    //Contacts states
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState();
    const [contactsPagination, setContactsPagination] = useState(0);


    const applyMembersPagination = async (index) => {
        withLoading(async () => { setMembers(await getMembers(listSelected, index)); })
        setMembersPagination(index);
    }

    const applyContactsPagination = async (index) => {
        if (members.total / 20 >= index)
            applyMembersPagination(index)

        withLoading(async () => { setContacts(await getContacts(index, filter)); })
        setContactsPagination(index);
    }

    const applyFilter = async (newFilter) => {

        setContactsPagination(0);
        withLoading(async () => { setContacts(await getContacts(0, newFilter)); })
        setFilter(newFilter);

    }

    const handleListSelection = async (event) => {

        setListSelected(event.target.value);
        withLoading(async () => {
            setMembers(await getMembers(event.target.value, 0));
            setContacts((await getContacts(0)));
        })
        setContactsPagination(0);
        setMembersPagination(0);
    }

    const handleAdd = async (contacts) => {

        withLoading(async () => {
            await addMemberCollection(listSelected, contacts);
            setMembers(await getMembers(listSelected, membersPagination));
            setContacts((await getContacts(contactsPagination)));
        })
    }

    const handleRemoveMembers = async (members) => {
        withLoading(async () => {
            await removeMemberCollection(listSelected, members);
            setMembers(await getMembers(listSelected, membersPagination));
        })
    }

    const handleAddList = async (e, newList) => {
        e.preventDefault();
       
        withLoading(async () => {
            await createList(newList+"-"+application.shortName);
            setLists(await getLists());
        })
    }
    const deleteLists = (lists) => {
        withLoading(async () => {
            await deleteCollectionLists(lists);
            setLists(await getLists());
        })

    }


    const fetchApi = async () => {
        setLists(await getLists())
        setApplication(await getApplication())
        setContacts((await getContacts(contactsPagination)))
    }

    useEffect(() => {
        withLoading(async () => {
            new BlipTabs('tab-nav')
            await fetchApi()
        })
    }, [])

    const title = "Broadcast List Plugin"

    return (
        <CommonProvider>
            <div id="main" className="App">
                <PageHeader title={title} />
                <PageTemplate title={title}>
                    <div id="tab-nav" className="bp-tabs-container">
                        <ul className="bp-tab-nav">
                            <li>
                                {/* eslint-disable-next-line */}
                                <a href="#" data-ref="lists">Manage Lists</a>
                            </li>
                            <li>
                                {/* eslint-disable-next-line */}
                                <a href="#" data-ref="members">Manage Members</a>
                            </li>
                            <li>
                                {/* eslint-disable-next-line */}
                                <a href="#" data-ref="contacts">Manage Contacts</a>
                            </li>
                        </ul>
                        <div className="bp-tab-content fl w-100" data-ref="lists">
                            <ListForm handleSubmit={handleAddList} />
                            <hr />
                            <ListsTable data={lists} deleteLists={deleteLists} />
                        </div>
                        <div className="bp-tab-content fl w-100" data-ref="members">
                            <ListSelect data={lists} handleSelection={handleListSelection} listSelected={listSelected} />
                            <hr />
                            {listSelected !== '' && listSelected !== 'Selecione uma lista' &&
                                (<MembersTable
                                    data={members.items}
                                    total={members.total}
                                    pagination={membersPagination}
                                    setPagination={applyMembersPagination}
                                    handleRemove={handleRemoveMembers} />)

                            }
                        </div>
                        <div className="bp-tab-content fl w-100" data-ref="contacts">
                            <ListSelect data={lists} handleSelection={handleListSelection} listSelected={listSelected} />
                            <hr />
                            {listSelected !== '' && listSelected !== 'Selecione uma lista' &&
                                (<ContactTable
                                    total={contacts.total}
                                    data={contacts.items}
                                    minus={members.items}
                                    filter={applyFilter}
                                    pagination={contactsPagination}
                                    setPagination={applyContactsPagination}
                                    handleAdd={handleAdd} />)
                            }

                        </div>
                    </div>
                </PageTemplate>
            </div>
        </CommonProvider >
    )
}

export default App