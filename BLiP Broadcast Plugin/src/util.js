

export const generateLinePagination = (pagination) => {
    var filterLine = '';
    if (pagination !== undefined) {

        filterLine = '?$skip=' + pagination + '&$take=' + (pagination + 20);

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
        const data = array1.filter((a, b) => {
            if (!array2.includes(a.identity)) {
                return a
            }
        })
        return data
    }
}

// const convertToDate = (stringDate) => {
//     const aux = stringDate.substr(0, 10).split("-");
//     const date = new Date(parseInt(aux[0]), parseInt(aux[1] - 1), parseInt(aux[2]));
//     return date;
// }


// export const verifyRange = (filter, messages) => {
//     if (messages !== undefined) {
//         for (const m of messages) {
//             if (convertToDate(filter.initialDate) <= convertToDate(m.date) &&
//                 convertToDate(filter.finalDate) >= convertToDate(m.date) && m.direction === "received") {
//                 console.log(messages)
//                 return true
//             }
//         }
//     }
//     return false
// }