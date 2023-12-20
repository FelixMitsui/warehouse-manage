import { Storage } from '@/api/stock/type'

export interface StocksState {
  stocks: Storage[]
  totalPage?: number
  totalCount: number
}
