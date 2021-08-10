export interface IAccount {
  id: string,
  title: string,
  currency: string,
  balance: number,
}

export interface IAccountPart {
  id: string,
  account: IAccount,
  isFixedAmount: boolean,
  amount: number,
  percentage: number,
}

export interface IAccountTransaction {
  id: string,
  timestamp: Date,
  amount: number,
  type: string,
}

export interface IAccountTransactionDiff {
  month: number,
  quarter: number,
  halfYear: number,
  year: number,
}

export interface IAccountTransactionHistory {
  diffByPeriod: IAccountTransactionDiff,
  transactions: Array<IAccountTransaction>,
}

export interface IAmount {
  amount: number,
  currency: string,
}

export interface IGoal {
  id: string,
  title: string,
  currency: string,
  requires: number,
  achieved: number,
  parts: Array<IAccountPart>,
}
