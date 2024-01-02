import { Barcode } from '@/api/inventory/type'

export interface InventoryState {
  inventories: Barcode[]
  totalCount: number
}
