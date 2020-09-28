import { IframeMessageProxy } from 'iframe-message-proxy'
import { generateLineFilter, generateLinePagination } from '../util';


export const getApplication = async () => {
    const { response: application } = await IframeMessageProxy.sendMessage({
        action: 'getApplication',
    })
    return application
}
export const getContactsBase = async (pagination, filter) => {

    try {
        const { response } = await IframeMessageProxy.sendMessage({
            action: 'sendCommand',
            content: {
                destination: 'MessagingHubService',
                command: {
                    method: 'get',
                    uri: '/contacts' + generateLinePagination(pagination) + generateLineFilter(filter)
                }
            }
        })


        return { status: true, response: response };

    } catch (error) {
        return { status: false, response: error };
    }

}


export const addContactBase = async (contact) => {

    try {
        await IframeMessageProxy.sendMessage(
            {
                action: 'sendCommand',
                content: {
                    destination: 'MessagingHubService',
                    command: {
                        method: "set",
                        uri: "/contacts",
                        type: "application/vnd.lime.contact+json",
                        resource: contact


                    }
                }
            })


        return { status: true, response: contact };

    } catch (error) {
        return { status: false, response: error };
    }
}

