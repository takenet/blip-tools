export const buildText = (data) => {

    let text = "function run() {\n"
        + " let workSchedule = " +
        formatData(data)
        + ";\n" +
        ' return JSON.stringify(workSchedule); //Return value will be saved as "Return value variable" field name'
        + "\n }";


    return text;
}

function formatData(data) {
    let items = [];
    let aux = JSON.parse(JSON.stringify(data));

    Object.keys(aux).forEach((key, i) => {
        if (aux[key].active && aux[key].workTime.length>0) {
            delete aux[key].active
            items.push(aux[key])
        }
    })

    return JSON.stringify(items, null, 4)
}