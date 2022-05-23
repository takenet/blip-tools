 /* eslint-disable */
 interface Storage {
  select: string;
  date: string;
}

 interface Open {
  select: string;
  date: string;
}

 interface TicketStatus {
  select: string;
  date: string;
}

 interface LastMessageDate {
  select: string;
  date: string;
}

 interface Dates {
  storage: Storage;
  open: Open;
  status: TicketStatus;
  lastMessageDate: LastMessageDate;
}

 interface Identities {
  agent: string;
  customer: string;
}

 interface Pagination {
  skip: number;
  take: number;
}

interface Status {
  closedClient: boolean;
  waiting: boolean;
  open: boolean;
}

export interface Filter {
  dates: Dates;
  identities: Identities;
  pagination: Pagination;
  status: Status;
}
