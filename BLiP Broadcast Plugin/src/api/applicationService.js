import { IframeMessageProxy } from 'iframe-message-proxy'
import { generateLineFilter, generateLinePagination } from '../util';
import { errorToast, successToast } from '../toastUtil';

export const getApplication = async () => {
    const { response: application } = await IframeMessageProxy.sendMessage({
        action: 'getApplication',
    })
    return application
}
/*
const applyDateMessagesFilter = async (items, filter) => {
    let data = items;
    if(items !== undefined){
    data = items.filter(async (a, b) => {
        if (verifyRange(filter, await getLastMessages(a.identity))) {
            return a
        }
    })}
    console.log("items", items)
    return data;
}
*/

export const getContacts = async (pagination, filter) => {
    try {
        const { response } = await IframeMessageProxy.sendMessage({
            action: 'sendCommand',
            content: {
                destination: 'MessagingHubService',
                command: {
                    method: 'get',
                    uri: '/contacts' + generateLinePagination(pagination*20) + generateLineFilter(filter)
                }
            }
        })
        
        return response

    } catch (error) {
        errorToast("Erro ao carregar contatos " + error)
        return { total: 0, items: [] };

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
                        identity: newListName + "@broadcast.msging.net"
                    }
                }
            }
        })

        successToast(newListName + " adicionada");
        return response;

    } catch (error) {
        errorToast("Erro ao criar lista " + error)
        return;
    }


}

export const removeMember = async (list, member) => {
    try {
        const response = await IframeMessageProxy.sendMessage({
            action: 'sendCommand',
            content: {
                destination: 'MessagingHubService',
                command: {
                    method: 'delete',
                    uri: "/lists/" + list + "/recipients/" + member,
                    to: 'postmaster@broadcast.msging.net'
                }
            }
        })

        successToast(member + " removido na lista" + list);
        return response

    } catch (error) {
        errorToast("Erro ao remover membros na listas " + error);
        return;
    }
}

export const addMember = async (list, contact) => {
    try {
        const response = await IframeMessageProxy.sendMessage({
            action: 'sendCommand',
            content: {
                destination: 'MessagingHubService',
                command: {
                    method: 'set',
                    uri: "/lists/" + list + "/recipients",
                    to: 'postmaster@broadcast.msging.net',
                    type: "application/vnd.lime.identity",
                    resource: contact
                }
            }
        })

        successToast(contact + " adicionado na lista " + list);
        return response;

    } catch (error) {
        errorToast("Erro ao adicionar membros na listas " + error);
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
        errorToast("Erro ao carregar informações de listas " + error);
        return [];
    }



}
export const getMembers = async (list, pagination) => {
    
    try {
        const { response } = await IframeMessageProxy.sendMessage({
            action: 'sendCommand',
            content: {
                destination: 'MessagingHubService',
                command: {
                    method: 'get',
                    uri: '/lists/' + list + '/recipients' +  generateLinePagination(pagination*20),
                    to: 'postmaster@broadcast.msging.net'
                }
            }
        })
        
        return response;
    } catch (error) {
        errorToast("Erro ao carregar informações de membros da lista " + list + " " + error);
        return { total: 0, items: [] };
    }

}


// export const getLastMessages = async (contact) => {
//     try {
//         const { response: { items } } = await IframeMessageProxy.sendMessage({
//             action: 'sendCommand',
//             content: {
//                 destination: 'MessagingHubService',
//                 command: {
//                     method: 'get',
//                     uri: '/threads/' + contact
//                 }
//             }
//         })

//         return items
//     } catch (error) {
//         console.log("Erro getLastMessages " + error)
//         return [];
//     }

// }

