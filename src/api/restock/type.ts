export interface Restock<T> {
  id?: number
  principal_name: string
  supplier_name: string
  shipping_date: Date | string
  products: T[]
  status: number
  create_at: Date | string
}
