import axios from "axios";

export const getIntents = async (key, handleError) => {
    const url = "https://msging.net/commands";

    const headers = {
        "Content-Type": "application/json",
        Authorization: `${key}`
    };

    const body = {
        "id": `gdfgdfgdf-fdgdfg-gdfgdf${Math.floor(Math.random() * 999999999999)}`,
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

export const getAnswers = async (key, intent) => {
    const url = "https://msging.net/commands";

    const headers = {
        "Content-Type": "application/json",
        Authorization: `${key}`
    };

    const body = {
        "id": `gfsdfsq143g-gdfgdf${Math.floor(Math.random() * 999999999999)}`,
        "to": "postmaster@ai.msging.net",
        "method": "get",
        "uri": `/intentions/${intent}?deep=true`
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