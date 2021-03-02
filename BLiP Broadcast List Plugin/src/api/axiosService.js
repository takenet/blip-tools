import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { generateLineFilter, generateLinePagination } from '../util'
const DEFAULT_DATA = { total: 0, items: [] }

export class AxiosService {
  static headers
  static url
  static toast

  static init(key, url, toast) {
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: key,
    }
    this.url = url
    this.toast = toast
  }

  static getApplication = async () => {
    const body = {
      id: uuidv4(),
      method: 'get',
      uri: '/configuration/caller',
    }
    try {
      const {
        data: {
          resource: { items },
        },
      } = await axios.post(this.url, body, {
        headers: this.headers,
      })
      const application = items.find((e) => e.name === 'Application')
      return { ...application, shortName: application.caller.split('@')[0] }
    } catch (error) {
      //  console.error(`Error to load intentions ${error}`)
      // show toast
      return { shortName: 'botId' }
    }
  }

  static getIntents = async () => {
    const body = {
      id: uuidv4(),
      to: 'postmaster@ai.msging.net',
      method: 'get',
      uri: '/intentions?take=100',
    }
    try {
      const response = await axios.post(this.url, body, {
        headers: this.headers,
      })
      return response.data.resource.items
    } catch (error) {
      console.error(`Error to load intentions ${error}`)
      // show toast
    }
  }

  static createList = async (newListName) => {
    const body = {
      id: uuidv4(),
      method: 'set',
      type: 'application/vnd.iris.distribution-list+json',
      uri: '/lists',
      to: 'postmaster@broadcast.msging.net',
      resource: {
        identity: `${newListName}@broadcast.msging.net`,
      },
    }
    try {
      const response = await axios.post(this.url, body, {
        headers: this.headers,
      })

      this.toast.success(`${newListName} added`)

      return response
    } catch (error) {
      this.toast.error('Error creating list ')
      return
    }
  }

  static getLists = async () => {
    const body = {
      id: uuidv4(),
      method: 'get',
      uri: '/lists?$take=5000',
      to: 'postmaster@broadcast.msging.net',
    }
    try {
      const {
        data: { resource: items },
      } = await axios.post(this.url, body, {
        headers: this.headers,
      })

      return items.items
    } catch (error) {
      this.toast.error('Error loading lists')
      return []
    }
  }

  static getContacts = async (pagination, filter) => {
    const body = {
      id: uuidv4(),
      method: 'get',
      uri:
        '/contacts' +
        generateLinePagination(pagination * 20) +
        generateLineFilter(filter),
    }

    try {
      const {
        data: { resource },
      } = await axios.post(this.url, body, {
        headers: this.headers,
      })

      return resource
    } catch (error) {
      this.toast.error('Error loading contacts')
      return DEFAULT_DATA
    }
  }

  static getMembers = async (list, pagination) => {
    const body = {
      id: uuidv4(),
      method: 'get',
      uri:
        `/lists/${encodeURI(list)}/recipients` +
        generateLinePagination(pagination * 20),
      to: 'postmaster@broadcast.msging.net',
    }
    try {
      const {
        data: { resource },
      } = await axios.post(this.url, body, {
        headers: this.headers,
      })
      return resource
    } catch (error) {
      this.toast.error(`Error loading member from ${encodeURI(list)} ${error}`)
      return DEFAULT_DATA
    }
  }

  static createList = async (newListName) => {
    const body = {
      id: uuidv4(),
      method: 'set',
      type: 'application/vnd.iris.distribution-list+json',
      uri: '/lists',
      to: 'postmaster@broadcast.msging.net',
      resource: {
        identity: `${newListName}@broadcast.msging.net`,
      },
    }

    try {
      const response = await axios.post(this.url, body, {
        headers: this.headers,
      })

      this.toast.success(`${newListName} added`)
      return response
    } catch (error) {
      this.toast.error('Error creating list ')
      return
    }
  }

  static deleteCollectionLists = async (lists) => {
    let count = 0
    for (const element of lists) {
      count += await this.deleteList(element.name)
    }
    this.toast.success(`${count} lists removed`)
  }
  static deleteList = async (list) => {
    const body = {
      id: uuidv4(),
      to: 'postmaster@broadcast.msging.net',
      method: 'delete',
      uri: `/lists/${encodeURI(list)}`,
    }
    try {
      await axios.post(this.url, body, {
        headers: this.headers,
      })

      return 1
    } catch (error) {
      this.toast.error('Error deleting list')
      return 0
    }
  }
  static removeMemberCollection = async (list, members) => {
    let count = 0
    for (const element of members) {
      count += await this.removeMember(list, element.name)
    }
    this.toast.success(`${count} members removed from ${encodeURI(list)}`)
  }
  static removeMember = async (list, member) => {
    const body = {
      id: uuidv4(),
      method: 'delete',
      uri: `/lists/${encodeURI(list)}/recipients/${encodeURI(member)}`,
      to: 'postmaster@broadcast.msging.net',
    }
    try {
      await axios.post(this.url, body, {
        headers: this.headers,
      })

      return 1
    } catch (error) {
      this.toast.error(`Error removing ${encodeURI(member)} from list`)
      return 0
    }
  }

  static addMemberCollection = async (list, contacts) => {
    let count = 0
    for (const element of contacts) {
      count += await this.addMember(list, element.identity)
    }

    this.toast.success(`${count} contacts added into ${encodeURI(list)}`)
  }
  static addMember = async (list, contact) => {
    const body = {
      id: uuidv4(),
      method: 'set',
      uri: `/lists/${encodeURI(list)}/recipients`,
      to: 'postmaster@broadcast.msging.net',
      type: 'application/vnd.lime.identity',
      resource: contact,
    }
    try {
      await axios.post(this.url, body, {
        headers: this.headers,
      })

      return 1
    } catch (error) {
      this.toast.error(`Error adding ${contact} into ${encodeURI(list)}`)
      return 0
    }
  }
}
