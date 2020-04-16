import React from "react"
import { Badge } from 'react-bootstrap';

export const generateLinePagination = (pagination) => {
    var filterLine = '';
    if (pagination !== undefined) {

        filterLine = '?$skip=' + pagination + '&$take=' + (20);

    }
    return filterLine
}


export const generateLineFilter = (filter) => {
    var filterLine = '';
    if (filter !== undefined || filter === []) {

        if (filter.condition === 'substringof' || filter.condition === 'not%20substringof')
            filterLine = "&$filter=(" + filter.condition + "('" + filter.value.split(" ").join("%20") + "'%2C" + filter.prop + "))";
        else
            filterLine = "&$filter=(" + filter.prop + "%20" + filter.condition + "%20'" + filter.value.split(" ").join("%20") + "')";

    }
    return filterLine
}

export const countIndex = (pagination) => {
    if (pagination < 20)
        return 0;
    else if (pagination % 20 === 0)
        return (pagination / 20);
    else
        return (~~(pagination / 20) + 1);
}

export const removeDuplicates = (array1, array2) => {
    if (array1 !== undefined) {
        const data = array1.map((a, b) => {
            if (array2.includes(a.identity))
                return Object.assign(a, {
                    isMember: <Badge pill variant="info">A member</Badge>
                })
            else
                return {
                    ...a, isMember: <Badge pill variant="success">
                        Not a member
              </Badge>
                }
        })

        return data;
    }
    return array1;
}


export const formatArrayToJson = (data, pagination) => {

    if (data !== undefined) {
        let items = [];
        data.forEach((e, i) => {
            items.push(pagination === undefined ?
                { num: i + 1, name: e }
                : { num: (pagination * 20) + i + 1, name: e })
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
