export interface User {
  email: string
  password: string
  _id?: string
  name?: string
  image?: string
}

export interface Account {
  title: string
  balance: number
  expenses?: number
  incomes?: number
  periodBalance?: number
  user?: string
  _id?: string
}

export interface Message {
  message: string
}

export interface Transaction {
  account: string
  user?: string
  type: string
  appointment?: string
  source?: string
  price: number
  date?: Date
  note: string
  _id?: string
}

export interface Filter {
  start?: Date
  end?: Date
  transaction?: string
  appointment?: string
  source?: string
}

export interface Appointment {
  value: string
  viewValue: string
  iconValue: string
}

export interface Source {
  value?: string
  viewValue?: string
  user?: string
  _id?: string
}

export interface Feedback {
  name: string
  email: string
  message: string
  user?: string
}
