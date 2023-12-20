import { RouteRecordRaw } from 'vue-router'
import { User } from '@/api/user/type'
export interface UserState {
  menuRoutes: RouteRecordRaw[]
  email: string
  name: string
  role: string
  auth: number
  supplier_name?: string
}

export interface UsersState {
  users: User[]
  totalCount: number
}
