export interface Product {
  id: number
  cid: string
  name: string
  price: number
  spec: string | null
  discount: number
  count?: number
  create_at: Date
}
