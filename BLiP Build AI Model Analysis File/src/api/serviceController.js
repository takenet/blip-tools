import { getContactsBase, addContactBase } from "./applicationService.js"
import { errorToast, successToast } from '../toastUtil';

const DEFAULT_DATA = { total: 0, items: [] };

export const addContactCollections = async (contacts) => {
    let count = 0;
    for (const contact of contacts) {
        let { status, response } = await addContactBase(contact);
        if (status)
            count++;
        else
            errorToast(`Error adding the contact ${contact.identity}!`)
    }
    successToast(`${count} contacts successfully added!`);
}

export const addContact = async (contact) => {
    console.log(contact);

    let { status, response } = await addContactBase(contact);
    if (status)
        successToast(`${contact.identity} successfully added!`);
    else
        errorToast(`Error adding the contact ${contact.identity}!`)


}

export const getContacts = async (pagination, filter) => {
    let { status, response } = await getContactsBase(pagination, filter);
    if (status)
        return response;
    else
        errorToast("Error loading contacts" + response)

    return DEFAULT_DATA;
}
