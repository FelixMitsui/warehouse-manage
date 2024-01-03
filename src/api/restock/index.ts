import request from '@/utils/request'
import type { Restock } from './type'
import { Response } from '../type'
import { Product } from '../product/type'

enum API {
  RESTOCKS_URL = '/restocks',
}
export const reqGetRestocks = () =>
  request.get<any, Response<Restock<Product>[]>>(API.RESTOCKS_URL)
export const reqCreateRestock = (data: Restock<Product>) =>
  request.post<any, Response<null>>(API.RESTOCKS_URL, data)

export const reqUpdateRestockStatus = (id: number) =>
  request.patch<any, Response<Restock<Product>>>(`${API.RESTOCKS_URL}/${id}`, {
    status: 1,
  })
