import request from '@/utils/request'
import type { Barcode } from './type'
import { Response } from '../type'

enum API {
  INVENTORIES_URL = '/inventories',
}

export const reqGetInventories = () =>
  request.get<any, Response<Barcode[]>>(`${API.INVENTORIES_URL}`)

export const reqCreateBarcode = (data: Barcode) =>
  request.post<any, Response<Barcode>>(API.INVENTORIES_URL, data)

export const reqUpdateInventoryLocation = ({
  id,
  location_name,
}: Pick<Barcode, 'id' | 'location_name'>) =>
  request.patch<any, Response<Barcode>>(`${API.INVENTORIES_URL}/${id}`, {
    location_name: location_name,
  })
