import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { AxiosCommomService } from './AxiosCommomService'

export class AxiosService {
  static headers
  static url

  static init(key, url) {
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: key,
    }
    this.url = url
  }
  static wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  static getThreads = async () => {
    const body = {
      id: uuidv4(),
      method: 'get',
      uri: '/threads',
    }
    try {
      const {
        data: { resource: items },
      } = await axios.post(this.url, body, {
        headers: this.headers,
      })
      return items.items
    } catch (error) {
      AxiosCommomService.showErrorToast(`Error loading threads ${error}`)
      return []
    }
  }

  static sendMessage = async (contactId, message) => {
    const body = {
      id: uuidv4(),
      to: contactId,
      type: 'text/plain',
      content: message,
      metadata: {
        '#message.replaceVariables': 'true',
      },
    }
    try {
      const url = this.url.replace('commands', 'messages')
      const response = await axios.post(url, body, {
        headers: this.headers,
      })
      await this.wait(1000)
      return response.status === 202
    } catch (error) {
      AxiosCommomService.showErrorToast(`Error send message ${error}`)
      return false
    }
  }

  static getContact = async (contactIdentity, owner) => {
    const body = {
      id: uuidv4(),
      method: 'get',
      uri: `${owner ? `lime://${owner}` : ''}/contacts/${contactIdentity}`,
    }

    try {
      const {
        data: { resource },
      } = await axios.post(this.url, body, {
        headers: this.headers,
      })
      if (resource === undefined) throw new Error('')

      return resource
    } catch (error) {
      AxiosCommomService.showErrorToast(`Error loading contact ${error}`)
      return
    }
  }

  static mergeContact = async (contact, owner) => {
    const body = {
      id: uuidv4(),
      method: 'merge',
      type: 'application/vnd.lime.contact+json',
      uri: `${owner ? `lime://${owner}` : ''}/contacts`,
      resource: contact,
    }
    try {
      const response = await axios.post(this.url, body, {
        headers: this.headers,
      })

      if (response.status !== 200) throw new Error('')
      await this.wait(4000)
      return true
    } catch (error) {
      AxiosCommomService.showErrorToast(`Error merging contact ${error}`)
      return false
    }
  }

  static getTunnelInfo = async (tunnel) => {
    const body = {
      id: uuidv4(),
      to: 'postmaster@tunnel.msging.net',
      uri: `/tunnels/${tunnel}`,
      method: 'get',
    }

    try {
      const {
        data: { resource },
      } = await axios.post(this.url, body, {
        headers: this.headers,
      })

      return resource
    } catch (error) {
      AxiosCommomService.showErrorToast(`Error loading contact ${error}`)
      return
    }
  }
  static createTicket = async (customerIdentity) => {
    const body = {
      id: uuidv4(),
      method: 'set',
      to: 'postmaster@desk.msging.net',
      uri: '/tickets',
      type: 'application/vnd.iris.ticket+json',
      resource: {
        customerIdentity: `${customerIdentity}`,
        customerInput: {
          type: 'text/plain',
          value: 'Ticket Created by Create Ticket Plugin/Tool',
        },
      },
    }

    try {
      const {
        data: { resource },
      } = await axios.post(this.url, body, {
        headers: this.headers,
      })
      if (!resource) throw new Error()

      return resource
    } catch (error) {
      AxiosCommomService.showErrorToast(`Error create a ticket ${error}`)
      return
    }
  }

  static setState = async (flowId, stateId, contactId, owner) => {
    const body = {
      id: uuidv4(),
      method: 'set',
      to: 'postmaster@msging.net',
      uri:
        `${owner ? `lime://${owner}` : ''}` +
        `/contexts/${contactId}/stateid%40${flowId}`,
      type: 'text/plain',
      resource: `${stateId}`,
    }
    try {
      const response = await axios.post(this.url, body, {
        headers: this.headers,
      })
      await this.wait(3000)

      return response
    } catch (error) {
      AxiosCommomService.showErrorToast(`Error setting state ${error}`)
      return
    }
  }
  static setMasterState = async (originator, destination, owner) => {
    const body = {
      id: uuidv4(),
      method: 'set',
      to: 'postmaster@msging.net',
      uri:
        `${owner ? `lime://${owner}` : ''}` +
        `/contexts/${originator}/master-state`,
      type: 'text/plain',
      resource: `${destination}`,
    }
    try {
      const response = await axios.post(this.url, body, {
        headers: this.headers,
      })
      await this.wait(5000)
      return response
    } catch (error) {
      AxiosCommomService.showErrorToast(`Error setting masterstate ${error}`)
      return
    }
  }
  static getContacts = async () => {
    const body = {
      id: uuidv4(),
      method: 'get',
      uri: '/contacts',
    }

    try {
      const {
        data: {
          resource: { items },
        },
      } = await axios.post(this.url, body, {
        headers: this.headers,
      })

      return items
    } catch (error) {
      AxiosCommomService.showErrorToast(`Error loading contacts ${error}`)
      return []
    }
  }
  static getLastMessage = async (contactIdentity) => {
    const body = {
      id: uuidv4(),
      method: 'get',
      uri: `/threads/${contactIdentity}?take=100`,
    }
    try {
      const response = await axios.post(this.url, body, {
        headers: this.headers,
      })

      if (response.data.resource.items.length === 0) return 'More than 90 days'

      return response.data.resource.items.find(
        (e) => e.direction === 'received'
      ).date
    } catch (error) {
      console.error(`Error to get last message - ${error}`)
      return "Couldn't find"
    }
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
      return {
        ...application,
        shortName: application.caller.split('@')[0],
        applicationJson: JSON.parse(application.value),
      }
    } catch (error) {
      AxiosCommomService.showErrorToast(`Error loading application ${error}`)
      return { shortName: 'botId' }
    }
  }
}
