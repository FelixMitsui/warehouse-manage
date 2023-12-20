export interface FormData {
  email: string
  password: string
}

export interface UserData<T> {
  user: T
  accessToken: string
}

export interface User {
  id: number
  email: string
  name: string
  auth: number
  role: string
  supplier_name: string
  create_at: Date
}
