export enum StockArea {
  RESTOCK = 'RESTOCK',
  DELIVERY = 'DELIVERY',
  A01 = 'A01',
  A02 = 'A02',
  A03 = 'A03',
  B01 = 'B01',
  B02 = 'B02',
  B03 = 'B03',
  C01 = 'C01',
  C02 = 'C02',
  C03 = 'C03',
}

export interface Product {
  pid: number
  name: string
}

export interface Storage {
  id?: number
  barcode: string
  storage_id: StockArea
  product: Product
}
