export const PAGINATION_ELEMENTS_DEFAULT = 100;


export const generateLinePagination = (pagination) => {
    pagination *= PAGINATION_ELEMENTS_DEFAULT;
    var filterLine = '';
    if (pagination !== undefined) {

        filterLine = '?$skip=' + pagination + '&$take=' + (PAGINATION_ELEMENTS_DEFAULT);

    }
    return filterLine
}
export const generateLineFilter = (filter) => {

    var filterLine = '';
    if (typeof filter !== 'undefined' && Object.keys(filter).length !== 0) {

        if (filter.condition === 'substringof' || filter.condition === 'not%20substringof')
            filterLine = "&$filter=(" + filter.condition + "('" + filter.value.split(" ").join("%20") + "'%2C" + filter.prop + "))";
        else
            filterLine = "&$filter=(" + filter.prop + "%20" + filter.condition + "%20'" + filter.value.split(" ").join("%20") + "')";

    }
    return filterLine
}
export const countIndex = (pagination) => {
    if (pagination < PAGINATION_ELEMENTS_DEFAULT)
        return 0;
    else if (pagination % PAGINATION_ELEMENTS_DEFAULT === 0)
        return (pagination / PAGINATION_ELEMENTS_DEFAULT);
    else
        return (~~(pagination / PAGINATION_ELEMENTS_DEFAULT) + 1);
}
export const formatArrayToJson = (data, pagination) => {

    if (data !== undefined) {
        let items = [];
        data.forEach((e, i) => {
            items.push(pagination === undefined ?
                { num: i + 1, name: e }
                : { num: (pagination * PAGINATION_ELEMENTS_DEFAULT) + i + 1, name: e })
        });

        return items
    }
    return [];
}
export const sortData = (data, sort) => {
    if (data !== undefined & data.length > 1) {
        data.sort(
            sort.order === 'asc' ?
                (a, b) => (a[sort.property] > b[sort.property]) ? 1 : ((b[sort.property] > a[sort.property]) ? -1 : 0) :
                (a, b) => (a[sort.property] < b[sort.property]) ? 1 : ((b[sort.property] < a[sort.property]) ? -1 : 0))
    }
    return data;
}

export const buildModel = (header) => {
    return [
        { label: "Identity", key: "identity" },
        { label: "Name", key: "name" },
        { label: "Source", key: "source" },
    ];
}


export const buildData = (header, data) => {
    let items = [];

    data.forEach(e => {
        let aux = {};
        for (let index = 0; index < header.length; index++) {
            if (header[index] === "extras" & e.data[index] !== "") {
                Object.assign(aux, {
                    ...aux,
                    [header[index]]: JSON.parse(
                        e.data[index]
                            .split("&")
                            .join(",")
                            .split("'")
                            .join('"')
                    )
                });
            }
            else if (e.data[index] !== "")
                Object.assign(aux, { ...aux, [header[index]]: e.data[index] });
        }
        items.push(aux);
    });
    return items;
}

export const removeEmptyFields = (data) => {
    let items = {};
    for (const key in data) {
        if (data[key] !== "") {
            items = {...items, [key]: data[key] };
        }
    }
    return items;
}
