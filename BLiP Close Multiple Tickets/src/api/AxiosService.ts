import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { AxiosCommomService } from './AxiosCommomService'
import { builderTicketFilter } from '../util'
import { Filter } from '../constants/entities'

const TAKE_PAGINATION_MAX_VALUE = 100
export class AxiosService {
  static headers: Object
  static url: string

  static init(key: string, url: string): void {
    AxiosService.headers = {
      'Content-Type': 'application/json',
      Authorization: key,
    }
    AxiosService.url = url
  }
  static wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))
  static getThreads = async (): Promise<any> => {
    const body = {
      id: uuidv4(),
      method: 'get',
      uri: '/threads',
    }
    try {
      const {
        data: { resource: items },
      } = await axios.post(AxiosService.url, body, {
        headers: AxiosService.headers,
      })
      return items.items
    } catch (error) {
      AxiosCommomService.showErrorToast(`Error loading threads ${error}`)
      return []
    }
  }
  static getContacts = async (): Promise<any> => {
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
      } = await axios.post(AxiosService.url, body, {
        headers: AxiosService.headers,
      })

      return items
    } catch (error) {
      AxiosCommomService.showErrorToast(`Error loading contacts ${error}`)
      return []
    }
  }
  static getApplication = async (): Promise<any> => {
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
      } = await axios.post(AxiosService.url, body, {
        headers: AxiosService.headers,
      })
      const application = items.find((e) => e.name === 'Application')
      return { ...application, shortName: application.caller.split('@')[0] }
    } catch (error) {
      AxiosCommomService.showErrorToast(`Error loading application ${error}`)
      return { shortName: 'botId' }
    }
  }

  static getTicketsPagination = async (filter: Filter): Promise<any> => {
    const ticketFilter = JSON.parse(JSON.stringify(filter))

    let tickets = []

    while (ticketFilter.pagination.skip < filter.pagination.take) {
      const ticketsPagination = await AxiosService.getTickets(ticketFilter)
      if (ticketsPagination.length === 0) break

      tickets = [...tickets, ...ticketsPagination]

      ticketFilter.pagination.skip += TAKE_PAGINATION_MAX_VALUE
    }

    return tickets.filter(
      (value, index, self) => self.map((x) => x.id).indexOf(value.id) === index
    )
  }

  static getTickets = async (filter: Filter): Promise<any> => {
    const body = {
      id: uuidv4(),
      to: 'postmaster@desk.msging.net',
      method: 'get',
      uri: `/tickets?$skip=${
        filter.pagination.skip
      }&$take=100&$filter=${builderTicketFilter(filter)}`,
    }
    try {
      const response = await axios.post(AxiosService.url, body, {
        headers: AxiosService.headers,
      })
      if (response.data.status !== 'success')
        throw new Error(
          'Exception message: Error to load tickets ' + JSON.stringify(response)
        )

      const items = []
      for (const item of response.data.resource.items) {
        items.push({
          ...item,
          lastMessageDate: await AxiosService.getLastMessage(
            item.customerIdentity,
            item.id
          ),
        })
      }

      if (filter.dates.lastMessageDate.date !== '')
        return items.filter(
          (e) =>
            (filter.dates.lastMessageDate.select === '<' &&
              filter.dates.lastMessageDate.date > e.lastMessageDate) ||
            (filter.dates.lastMessageDate.select === '>' &&
              filter.dates.lastMessageDate.date < e.lastMessageDate)
        )
      else return items
    } catch (error) {
      console.error('Error to load tickets' + error)
      AxiosCommomService.showErrorToast('Error to load tickets')
      return []
    }
  }

  static getLastMessage = async (
    customerIdentity: string,
    ticketId: string
  ): Promise<any> => {
    const body = {
      id: uuidv4(),
      method: 'get',
      to: 'postmaster@desk.msging.net',
      uri: `/tickets/${ticketId}/messages?$take=100${
        customerIdentity.includes('tunnel') ? '&getFromOwnerIfTunnel=true' : ''
      }`,
    }
    try {
      const response = await axios.post(AxiosService.url, body, {
        headers: AxiosService.headers,
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

  static closeTicket = async (ticketId: string): Promise<boolean> => {
    const body = {
      id: uuidv4(),
      to: 'postmaster@desk.msging.net',
      method: 'set',
      uri: '/tickets/change-status',
      type: 'application/vnd.iris.ticket+json',
      resource: {
        id: ticketId,
        status: 'ClosedAttendant',
      },
    }
    try {
      const response = await axios.post(AxiosService.url, body, {
        headers: AxiosService.headers,
      })
      if (response.data.status === 'success') {
        return true
      }

      AxiosCommomService.showErrorToast(
        `Error to close ticket ${ticketId}- ${JSON.stringify(response)}`
      )
      return false
    } catch (error) {
      console.error(`Error to close ticket ${ticketId} - ${error}`)
      AxiosCommomService.showErrorToast(`Error to close ticket ${ticketId}`)
      return false
    }
  }

  static closeTicketAlreadyClosedClient = async (
    ticketId: string
  ): Promise<boolean> => {
    const body = {
      id: uuidv4(),
      to: 'postmaster@desk.msging.net',
      method: 'set',
      uri: `/tickets/${ticketId}/close`,
      type: 'application/vnd.iris.ticket+json',
      resource: {
        id: ticketId,
        tags: [],
        status: 'ClosedClient',
      },
    }
    try {
      const response = await axios.post(AxiosService.url, body, {
        headers: AxiosService.headers,
      })
      if (response.data.status === 'success') {
        return true
      }

      AxiosCommomService.showErrorToast(
        `Error to close ticket ${ticketId}- ${JSON.stringify(response)}`
      )
      return false
    } catch (error) {
      console.error(`Error to close ticket ${ticketId} - ${error}`)
      AxiosCommomService.showErrorToast(`Error to close ticket ${ticketId}`)
      return false
    }
  }
}
