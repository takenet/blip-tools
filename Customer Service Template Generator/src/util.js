export const buildText = (data) => {

  const text = 'function run() {\n'
        + ' let workSchedule = ' +
        formatData(data)
        + ';\n' +
        ' return JSON.stringify(workSchedule); //Return value will be saved as "Return value variable" field name'
        + '\n }'

  return text
}

function formatData(data) {
  const items = []
  const aux = JSON.parse(JSON.stringify(data))

  Object.keys(aux).forEach((key) => {
    if (aux[key].active && aux[key].workTime.length>0) {
      delete aux[key].active
      items.push(aux[key])
    }
  })

  return JSON.stringify(items, null, 4)
}