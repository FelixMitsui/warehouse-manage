export const TABLE_COL_ITEMS = [
  {
    label: '儲位',
    prop: 'location_name',
    width: '100',
  },
  {
    label: '商品條碼',
    prop: 'barcode_id',
    width: '120',
  },
  {
    label: '編號',
    prop: 'product.pid',
    width: '100',
  },
  {
    label: '商品名稱',
    prop: 'product.name',
  },
]

export const SEARCH_OPTIONS = [
  { label: '儲位', value: 'location_name' },
  { label: '商品名稱', value: 'product.name_like' },
]
