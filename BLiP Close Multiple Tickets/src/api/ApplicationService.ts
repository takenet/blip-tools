import { IframeMessageProxy } from 'iframe-message-proxy'
import { CommomService } from './CommomService'
import { builderTicketFilter } from '../util'
import { Filter } from '../constants/entities'
const TAKE_PAGINATION_MAX_VALUE = 100

export class ApplicationService {
  static getApplication = async (): Promise<any> => {
    const { response: application } = await IframeMessageProxy.sendMessage({
      action: 'getApplication',
    })
    return application
  }
  static wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  static ping = async (): Promise<boolean> => {
    try {
      const { response } = await IframeMessageProxy.sendMessage({
        action: 'sendCommand',
        content: {
          destination: 'MessagingHubService',
          command: {
            method: 'get',
            uri: '/ping',
          },
        },
      })

      return response !== undefined || false
    } catch (error) {
      return false
    }
  }
  static getContacts = async (): Promise<any> => {
    try {
      const {
        response: { items },
      } = await IframeMessageProxy.sendMessage({
        action: 'sendCommand',
        content: {
          destination: 'MessagingHubService',
          command: {
            method: 'get',
            uri: '/contacts',
          },
        },
      })

      return items
    } catch (error) {
      console.error(`Error to load ${error}`)
      return []
    }
  }
  static getTicketsPagination = async (filter: Filter): Promise<any> => {
    const ticketFilter = JSON.parse(JSON.stringify(filter))

    let tickets = []

    while (ticketFilter.pagination.skip < filter.pagination.take) {
      const ticketsPagination = await ApplicationService.getTickets(
        ticketFilter
      )
      if (ticketsPagination.length === 0) break

      tickets = [...tickets, ...ticketsPagination]

      ticketFilter.pagination.skip += TAKE_PAGINATION_MAX_VALUE
    }

    return tickets.filter(
      (value, index, self) => self.map((x) => x.id).indexOf(value.id) === index
    )
  }
  static getTickets = async (filter: Filter): Promise<any> => {
    try {
      const { response } = await IframeMessageProxy.sendMessage({
        action: 'sendCommand',
        content: {
          destination: 'MessagingHubService',
          command: {
            to: 'postmaster@desk.msging.net',
            method: 'get',
            uri: `/tickets?$skip=${
              filter.pagination.skip
            }&$take=100&$filter=${builderTicketFilter(filter)}`,
          },
        },
      })
      const items = []
      for (const item of response.items) {
        items.push({
          ...item,
          lastMessageDate: await ApplicationService.getLastMessage(
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
      console.error(`Error to load ${error}`)
      CommomService.showErrorToast('Error to load tickets')
      return []
    }
  }

  static getLastMessage = async (
    customerIdentity: string,
    ticketId: string
  ): Promise<any> => {
    try {
      const { response } = await IframeMessageProxy.sendMessage({
        action: 'sendCommand',
        content: {
          destination: 'MessagingHubService',
          command: {
            method: 'get',
            to: 'postmaster@desk.msging.net',
            uri: `/tickets/${ticketId}/messages?$take=100${
              customerIdentity.includes('tunnel')
                ? '&getFromOwnerIfTunnel=true'
                : ''
            }`,
          },
        },
      })

      if (response.items.length === 0) return 'More than 90 days'

      return response.items.find((e) => e.direction === 'received').date
    } catch (error) {
      console.error(`Error to get last message - ${error}`)
      return "Couldn't find"
    }
  }

  static getThreads = async (): Promise<any> => {
    try {
      const {
        response: { items },
      } = await IframeMessageProxy.sendMessage({
        action: 'sendCommand',
        content: {
          destination: 'MessagingHubService',
          command: {
            method: 'get',
            uri: '/threads',
          },
        },
      })

      return items
    } catch (error) {
      console.error(`Error to load ${error}`)
      return []
    }
  }

  static closeTicket = async (ticketId: string): Promise<boolean> => {
    try {
      await IframeMessageProxy.sendMessage({
        action: 'sendCommand',
        content: {
          destination: 'MessagingHubService',
          command: {
            to: 'postmaster@desk.msging.net',
            method: 'set',
            uri: '/tickets/change-status',
            type: 'application/vnd.iris.ticket+json',
            resource: {
              id: ticketId,
              status: 'ClosedAttendant',
            },
          },
        },
      })

      return true
    } catch (error) {
      console.error(`Error to close ticket ${ticketId} - ${error}`)
      CommomService.showErrorToast(`Error to close ticket ${ticketId}`)
      return false
    }
  }

  static closeTicketAlreadyClosedClient = async (
    ticketId: string
  ): Promise<boolean> => {
    try {
      await IframeMessageProxy.sendMessage({
        action: 'sendCommand',
        content: {
          destination: 'MessagingHubService',
          command: {
            to: 'postmaster@desk.msging.net',
            method: 'set',
            uri: `/tickets/${ticketId}/close`,
            type: 'application/vnd.iris.ticket+json',
            resource: {
              id: ticketId,
              tags: [],
              status: 'ClosedClient',
            },
          },
        },
      })

      return true
    } catch (error) {
      console.error(`Error to close ticket ${ticketId} - ${error}`)
      CommomService.showErrorToast(`Error to close ticket ${ticketId}`)
      return false
    }
  }
  static createTicket = async (customerIdentity: string): Promise<any> => {
    try {
      const { response } = await IframeMessageProxy.sendMessage({
        action: 'sendCommand',
        content: {
          destination: 'MessagingHubService',
          command: {
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
          },
        },
      })

      return response
    } catch (error) {
      CommomService.showErrorToast(`Error createTicket ${error}`)
      return
    }
  }
}
