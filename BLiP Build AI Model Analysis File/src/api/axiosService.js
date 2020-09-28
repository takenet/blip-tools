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