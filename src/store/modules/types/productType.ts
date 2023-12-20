import { Product } from '@/api/product/type'

export interface ProductsState {
  products: Product[]
  totalCount?: number
}
