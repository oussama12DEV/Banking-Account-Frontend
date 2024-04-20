
export interface AccountDetails {
  accountid:           string;
  balance:             number;
  currentpage:         number;
  sizepage:            number;
  totalpage:           number;
  accountHistoriyDTOS: AccountOberation[];
}

export interface AccountOberation {
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          string;
  description:   string;
}
