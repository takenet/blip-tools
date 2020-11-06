import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export const getIntents = async (key, url, handleError) => {

    const headers = {
        "Content-Type": "application/json",
        Authorization: `${key}`
    };

    const body = {
        "id": uuidv4(),
        "to": "postmaster@ai.msging.net",
        "method": "get",
        "uri": "/intentions?take=100"
    }
    try {
        let response = await axios.post(url, body, {
            headers: headers
        });
        return response.data.resource.items;
    } catch (error) {
        console.error(`Error to load intentions`)
        handleError();
    }


}

export const getAnswers = async (key, url, intent) => {

    const headers = {
        "Content-Type": "application/json",
        Authorization: `${key}`
    };

    const body = {
        "id": uuidv4(),
        "to": "postmaster@ai.msging.net",
        "method": "get",
        "uri": `/intentions/${encodeURI(intent)}?deep=true`
    }
    try {
        let response = await axios.post(url, body, {
            headers: headers
        });
        return response.data.resource;
    } catch (error) {
        console.error(`Error to load Answers`)
    }
}

export const getOpenTickets = async (header, toastError, updateProgressBar) => {

    const headers = {
        "Content-Type": "application/json",
        Authorization: `${header.key}`
    };

    const body = {
        "id": uuidv4(),
        "to": "postmaster@desk.msging.net",
        "method": "get",
        "uri": `/tickets?$filter=status%20eq%20'open'${header.status.waiting ? "%20or%20status%20eq%20'waiting'" : ''}${header.identities.customer ? `%20and%20(substringof('${encodeURI(header.identities.customer)}'%2CCustomerIdentity))` : ''}${header.dates.storage.date ? `%20and%20storageDate%20${header.dates.storage.select === '>' ? 'ge' : 'le'}%20datetimeoffset'${encodeURIComponent(header.dates.storage.date)}'` : ''}${header.dates.open.date ? `%20and%20openDate%20${header.dates.open.select === '>' ? 'ge' : 'le'}%20datetimeoffset'${encodeURIComponent(header.dates.open.date)}'` : ''}${header.dates.status.date ? `%20and%20statusDate%20${header.dates.status.select === '>' ? 'ge' : 'le'}%20datetimeoffset'${encodeURIComponent(header.dates.status.date)}'` : ''}${header.identities.agent ? `%20and%20(AgentIdentity%20eq%20'${encodeURI(header.identities.agent)}')` : ''}&$skip=${header.pagination.skip}&$take=${header.pagination.take}`
    }
    try {
        let response = await axios.post(header.url, body, {
            headers: headers
        });
        let items = [];
        for (const item of response.data.resource.items) {
            items.push({
                ...item,
                lastMessageDate: await getLastMessage(header.key, header.url, item.customerIdentity, item.id)
            })

            let percentage = ((items.length / response.data.resource.items.length) * 100);
            updateProgressBar(percentage.toFixed(2));
        }
        if (header.dates.lastMessageDate.date !== '')
            return items.filter(e =>{
                if(header.dates.lastMessageDate.select === '<' && header.dates.lastMessageDate.date > e.lastMessageDate)
                return e
                else if(header.dates.lastMessageDate.select === '>' && header.dates.lastMessageDate.date < e.lastMessageDate)
                return e
            })
              
        else
            return items
    } catch (error) {
        console.error(`Error to load tickets` + error)
        toastError(`Error to load tickets`)
        return [];
    }


}


export const getLastMessage = async (key, url, customerIdentity, ticketId) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `${key}`
    }

    const body = {
        "id": uuidv4(),
        "method": "get",
        "to": "postmaster@desk.msging.net",
        "uri": `/tickets/${ticketId}/messages?$take=100${customerIdentity.includes("tunnel") ? '&getFromOwnerIfTunnel=true' : ''}`
    }
    try {
        let response = await axios.post(url, body, {
            headers: headers
        });

        if (response.data.resource.items.length === 0)
            return 'More than 90 days';

        return response.data.resource.items.find(e => e.direction === 'received').date;
    } catch (error) {
        console.error(`Error to get last message - ${error}`)
        return "Couldn't find"

    }


}



export const closeTicket = async (key, url, ticketId, toastError) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `${key}`
    }

    const body = {
        "id": uuidv4(),
        "to": "postmaster@desk.msging.net",
        "method": "set",
        "uri": "/tickets/change-status",
        "type": "application/vnd.iris.ticket+json",
        "resource": {
            "id": ticketId,
            "status": "ClosedAttendant"
        }
    }
    try {
        const response = await axios.post(url, body, {
            headers: headers
        });
        console.log("closing")
        if (response.data.status === 'success') {
            return true;
        }

        toastError(`Error to close ticket ${ticketId}`);
        return false;
    } catch (error) {
        console.error(`Error to close ticket ${ticketId} - ${error}`);
        toastError(`Error to close ticket ${ticketId}`);
        return false;

    }


}
