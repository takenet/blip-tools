import { IframeMessageProxy } from 'iframe-message-proxy'
import { generateLineFilter, generateLinePagination } from '../util';
import { errorToast, successToast } from '../toastUtil';

const DEFAULT_DATA = { total: 0, items: [] };

export const getApplication = async () => {
    const { response: application } = await IframeMessageProxy.sendMessage({
        action: 'getApplication',
    })
    return application
}
export const getContacts = async (pagination, filter) => {
    try {
        const { response } = await IframeMessageProxy.sendMessage({
            action: 'sendCommand',
            content: {
                destination: 'MessagingHubService',
                command: {
                    method: 'get',
                    uri: '/contacts' + generateLinePagination(pagination * 20) + generateLineFilter(filter)
                }
            }
        })

        return response

    } catch (error) {
        errorToast("Error loading contacts")
        return DEFAULT_DATA;

    }
}
export const createList = async (newListName) => {
    try {
        const response = await IframeMessageProxy.sendMessage({
            action: 'sendCommand',
            content: {
                destination: 'MessagingHubService',
                command: {
                    method: 'set',
                    type: "application/vnd.iris.distribution-list+json",
                    uri: '/lists',
                    to: 'postmaster@broadcast.msging.net',
                    resource: {
                        identity: `${newListName}@broadcast.msging.net`
                    }
                }
            }
        })

        successToast(`${newListName} added`);
        return response;

    } catch (error) {
        errorToast("Error creating list ")
        return;
    }


}
export const deleteCollectionLists = async (lists) => {
    let count = 0;
    for (const element of lists) {
        count += await deleteList(element.name);
    }
    successToast(`${count} lists removed`);
}
 const deleteList = async (list) => {
    list = encodeURI(list);
    try {
        await IframeMessageProxy.sendMessage({
            action: 'sendCommand',
            content: {
                destination: 'MessagingHubService',
                command: {
                    to: "postmaster@broadcast.msging.net",
                    method: "delete",
                    uri: `/lists/${list}`

                }
            }
        })


        return 1;

    } catch (error) {
        errorToast("Error deleting list")
        return;
    }


}
export const removeMemberCollection = async (list, members) => {
    let count = 0;
    for (const element of members) {
        count += await removeMember(list, element.name);
    }
    successToast(`${count} members removed from ${list}`);
}
const removeMember = async (list, member) => {
    list = encodeURI(list);
    member = encodeURI(member);
    try {
        await IframeMessageProxy.sendMessage({
            action: 'sendCommand',
            content: {
                destination: 'MessagingHubService',
                command: {
                    method: 'delete',
                    uri: `/lists/${list}/recipients/${member}`,
                    to: 'postmaster@broadcast.msging.net'
                }
            }
        })


        return 1;

    } catch (error) {
        errorToast(`Error removing ${member} from list`);
        return;
    }
}
export const addMemberCollection = async (list, contacts) => {
    let count = 0;
    for (const element of contacts) {
        count += await addMember(list, element.identity);
    }

    successToast(`${count} contacts added into ${list}`);
}
const addMember = async (list, contact) => {
    list = encodeURI(list);
    try {
        await IframeMessageProxy.sendMessage({
            action: 'sendCommand',
            content: {
                destination: 'MessagingHubService',
                command: {
                    method: 'set',
                    uri: `/lists/${list}/recipients`,
                    to: 'postmaster@broadcast.msging.net',
                    type: "application/vnd.lime.identity",
                    resource: contact
                }
            }
        })

        return 1;

    } catch (error) {
        errorToast(`Error adding ${contact} into ${list}`);
        return;
    }


}
export const getLists = async () => {
    try {
        const { response: { items } } = await IframeMessageProxy.sendMessage({
            action: 'sendCommand',
            content: {
                destination: 'MessagingHubService',
                command: {
                    method: 'get',
                    uri: '/lists',
                    to: 'postmaster@broadcast.msging.net'
                }
            }
        })

        return items;
    } catch (error) {
        errorToast("Error loading lists");
        return [];
    }



}
export const getMembers = async (list, pagination) => {
    list = encodeURI(list);
    try {
        const { response } = await IframeMessageProxy.sendMessage({
            action: 'sendCommand',
            content: {
                destination: 'MessagingHubService',
                command: {
                    method: 'get',
                    uri: `/lists/${list}/recipients` + generateLinePagination(pagination * 20),
                    to: 'postmaster@broadcast.msging.net'
                }
            }
        })

        return response;
    } catch (error) {
        errorToast(`Error loading member from ${list}`);
        return DEFAULT_DATA;
    }

}
