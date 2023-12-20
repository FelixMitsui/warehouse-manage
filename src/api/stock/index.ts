import request from '@/utils/request'
import type { Storage } from './type'
import { Response } from '../type'

enum API {
  STOCKS_URL = '/stocks',
}

export const reqGetStocks = () =>
  request.get<any, Response<Storage[]>>(`${API.STOCKS_URL}`)

export const reqCreateStock = (data: Storage) =>
  request.post<any, Response<Storage>>(API.STOCKS_URL, data)

export const reqUpdateStockStorage = ({
  id,
  storage_id,
}: Pick<Storage, 'id' | 'storage_id'>) =>
  request.patch<any, Response<Storage>>(`${API.STOCKS_URL}/${id}`, {
    storage_id: storage_id,
  })
