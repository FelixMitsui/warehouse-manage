export interface UserData<T> {
  user: T
  accessToken: string
}

export interface User extends Supplier {
  id: number
  email: string
  name: string
  password: string
  auth: number
  role: string
  create_at: Date
}

export interface Supplier {
  supplier_name?: string
}
