import request from '@/utils/request'
import type { UserData, User } from './type'
import { Response } from '../type'

enum API {
  LOGIN_URL = '/login',
  Auth_URL = '/signin',
  REGISTER_URL = '/register',
  LOGOUT_URL = '/users/logout',
  USERS_URL = '/users',
}

export const reqLogin = (formData: Pick<User, 'email' | 'password'>) =>
  request.post<
    any,
    Response<
      UserData<Pick<User, 'name' | 'auth' | 'email' | 'role' | 'supplier_name'>>
    >
  >(API.LOGIN_URL, formData)
export const reqAuth = () =>
  request.post<
    any,
    Response<
      UserData<Pick<User, 'name' | 'auth' | 'email' | 'role' | 'supplier_name'>>
    >
  >(API.Auth_URL)
export const reqLogout = () => request.post<any>(API.LOGOUT_URL)
export const reqRegister = (formData: User) =>
  request.post<any, Response<UserData<User>>>(API.REGISTER_URL, formData)
export const reqUpdateUser = ({
  id,
  ...formData
}: Pick<User, 'id' | 'role' | 'auth' | 'supplier_name'>) =>
  request.patch<any, Response<User>>(`${API.USERS_URL}/${id}`, formData)
export const reqUsers = () => request.get<any, Response<User[]>>(API.USERS_URL)
export const reqDeleteUser = (id: number | string) =>
  request.delete<any, Response<User>>(`${API.USERS_URL}/${id}`)
