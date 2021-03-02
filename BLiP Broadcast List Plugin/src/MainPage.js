/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react'
import 'blip-toolkit/dist/blip-toolkit.css'
import { withLoading } from './api/commomService'
import { BlipTabs } from 'blip-toolkit'
import ListsTable from './broadcastComponents/ListTable'
import ContactTable from './broadcastComponents/ContactTable'
import MembersTable from './broadcastComponents/MembersTable'
import ListSelect from './broadcastComponents/ListSelect'
import ListForm from './broadcastComponents/ListForm'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

function MainPage({ service, isHttp }) {
  const [application, setApplication] = useState({})

  const [lists, setLists] = useState([])

  const [listSelected, setListSelected] = useState('')

  //Members states
  const [members, setMembers] = useState({ total: 0, items: [] })
  const [membersPagination, setMembersPagination] = useState(0)

  //Contacts states
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState()
  const [contactsPagination, setContactsPagination] = useState(0)

  const applyMembersPagination = async (index) => {
    withLoading(async () => {
      setMembers(await service.getMembers(listSelected, index))
    })
    setMembersPagination(index)
  }

  const applyContactsPagination = async (index) => {
    if (members.total / 20 >= index) applyMembersPagination(index)

    withLoading(async () => {
      setContacts(await service.getContacts(index, filter))
    })
    setContactsPagination(index)
  }

  const applyFilter = async (newFilter) => {
    setContactsPagination(0)
    withLoading(async () => {
      setContacts(await service.getContacts(0, newFilter))
    })
    setFilter(newFilter)
  }

  const handleListSelection = async (event) => {
    setListSelected(event.target.value)
    withLoading(async () => {
      setMembers(await service.getMembers(event.target.value, 0))
      setContacts(await service.getContacts(0))
    })
    setContactsPagination(0)
    setMembersPagination(0)
  }

  const handleAdd = async (contacts) => {
    withLoading(async () => {
      await service.addMemberCollection(listSelected, contacts)
      setMembers(await service.getMembers(listSelected, membersPagination))
      setContacts(await service.getContacts(contactsPagination))
    })
  }

  const handleRemoveMembers = async (members) => {
    ReactGA.event({
      category: 'Blip Broadcast Plugin',
      action: 'Remove Members',
      label: `${isHttp ? 'Http' : 'Plugin'}`,
    })
    withLoading(async () => {
      await service.removeMemberCollection(listSelected, members)
      setMembers(await service.getMembers(listSelected, membersPagination))
    })
  }

  const handleAddList = async (e, newList) => {
    e.preventDefault()
    ReactGA.event({
      category: 'Blip Broadcast Plugin',
      action: 'Add List',
      label: `${isHttp ? 'Http' : 'Plugin'}`,
    })
    withLoading(async () => {
      await service.createList(newList + '-' + application.shortName)
      setLists(await service.getLists())
    })
  }
  const deleteLists = (lists) => {
    ReactGA.event({
      category: 'Blip Broadcast Plugin',
      action: 'Delete List',
      label: `${isHttp ? 'Http' : 'Plugin'}`,
    })
    withLoading(async () => {
      await service.deleteCollectionLists(lists)
      setLists(await service.getLists())
    })
  }

  const fetchApi = async () => {
    setLists(await service.getLists())
    setApplication(await service.getApplication())
    setContacts(await service.getContacts(contactsPagination))
  }

  useEffect(() => {
    withLoading(async () => {
      new BlipTabs('tab-nav')
      await fetchApi()
    })
  }, [service])

  return (
    <div id="tab-nav" className="bp-tabs-container">
      <ul className="bp-tab-nav">
        <li>
          {/* eslint-disable-next-line */}
          <a href="#" data-ref="lists">
            Manage Lists
          </a>
        </li>
        <li>
          {/* eslint-disable-next-line */}
          <a href="#" data-ref="members">
            Manage Members
          </a>
        </li>
        <li>
          {/* eslint-disable-next-line */}
          <a href="#" data-ref="contacts">
            Manage Contacts
          </a>
        </li>
      </ul>
      <div className="bp-tab-content fl w-100" data-ref="lists">
        <ListForm handleSubmit={handleAddList} />
        <hr />
        <ListsTable data={lists} deleteLists={deleteLists} />
      </div>
      <div className="bp-tab-content fl w-100" data-ref="members">
        <ListSelect
          data={lists}
          handleSelection={handleListSelection}
          listSelected={listSelected}
        />
        <hr />
        {listSelected !== '' && listSelected !== 'Selecione uma lista' && (
          <MembersTable
            data={members.items}
            total={members.total}
            pagination={membersPagination}
            setPagination={applyMembersPagination}
            handleRemove={handleRemoveMembers}
          />
        )}
      </div>
      <div className="bp-tab-content fl w-100" data-ref="contacts">
        <ListSelect
          data={lists}
          handleSelection={handleListSelection}
          listSelected={listSelected}
        />
        <hr />
        {listSelected !== '' && listSelected !== 'Selecione uma lista' && (
          <ContactTable
            total={contacts.total}
            data={contacts.items}
            minus={members.items}
            filter={applyFilter}
            pagination={contactsPagination}
            setPagination={applyContactsPagination}
            handleAdd={handleAdd}
          />
        )}
      </div>
    </div>
  )
}

MainPage.propTypes = {
  service: PropTypes.elementType.isRequired,
  isHttp: PropTypes.bool.isRequired,
}
export default MainPage
