import { Product } from '@/api/product/type'
import { Restock } from '@/api/restock/type'

export interface RestocksState {
  restocks: Restock<Product>[]
  totalCount?: number
}
