export interface Product {
  id: number
  cid: string
  name: string
  price: number
  spec: string | null
  discount: number
  qty?: number
  supplier_name: string
  create_at: Date
}
