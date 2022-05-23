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

export const builderTicketFilter = (filter) => {
  let stringFilter = ''

  stringFilter += `status%20eq%20'${Object.keys(filter.status).find(
    (k) => filter.status[k]
  )}'`

  stringFilter += 'and%20(closed%20eq%20false)'

  if (filter.identities.customer) {
    stringFilter += `%20and%20(substringof('${encodeURI(
      filter.identities.customer
    )}'%2CCustomerIdentity))`
  }
  if (filter.dates.storage.date) {
    stringFilter += `%20and%20storageDate%20${
      filter.dates.storage.select === '>' ? 'ge' : 'le'
    }%20datetimeoffset'${encodeURIComponent(
      filter.dates.storage.date
    )}:00.000Z'`
  }
  if (filter.dates.open.date) {
    stringFilter += `%20and%20openDate%20${
      filter.dates.open.select === '>' ? 'ge' : 'le'
    }%20datetimeoffset'${encodeURIComponent(filter.dates.open.date)}:00.000Z'`
  }
  if (filter.dates.status.date) {
    stringFilter += `%20and%20statusDate%20${
      filter.dates.status.select === '>' ? 'ge' : 'le'
    }%20datetimeoffset'${encodeURIComponent(filter.dates.status.date)}:00.000Z'`
  }
  if (filter.identities.agent) {
    stringFilter += `%20and%20(AgentIdentity%20eq%20'${encodeURI(
      filter.identities.agent
    )}')`
  }
  return stringFilter
}
