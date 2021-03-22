export const sortData = (data: Array<any>, sort: any): Array<any> => {
  if (data !== undefined && data.length > 1) {
    data.sort(
      sort.order === 'asc'
        ? (a, b) =>
            a[sort.property] > b[sort.property]
              ? 1
              : b[sort.property] > a[sort.property]
              ? -1
              : 0
        : (a, b) =>
            a[sort.property] < b[sort.property]
              ? 1
              : b[sort.property] < a[sort.property]
              ? -1
              : 0
    )
  }
  return data
}

export const removeEmptyFields = (data: Object) => {
  let items = {}
  for (const key in data) {
    if (data[key] !== '') {
      items = { ...items, [key]: data[key] }
    }
  }
  return items
}

export const isInside24hrsWindow = (contactDate: string): Boolean => {
  const date: Date = new Date(contactDate)
  date.setDate(date.getDate() + 1)
  const currentDate: Date = new Date()

  return date.toISOString() > currentDate.toISOString()
}
