import request from '@/utils/request'
import type { Product } from './type'
import { Response } from '../type'

enum API {
  PRODUCTS_URL = '/products',
}
export const reqGetProducts = (query: any) =>
  request.get<any, Response<Product[]>>(API.PRODUCTS_URL, { params: query })

export const reqCreateProduct = (formData: Product) =>
  request.post<any, Response<Product>>(API.PRODUCTS_URL, formData)
export const reqDeleteProduct = (id: number) =>
  request.delete<any, Response<Product>>(`${API.PRODUCTS_URL}/${id}`)
