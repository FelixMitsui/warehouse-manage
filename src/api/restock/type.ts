export interface Restock<T> {
  id?: number
  principal_name: string
  supplier_name: string
  products: T[]
  shipping_date: Date | null
  status: number
  create_at: Date
}
