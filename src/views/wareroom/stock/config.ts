export const TABLE_COL_ITEMS = [
  {
    label: '儲位',
    prop: 'storage_id',
    width: '100',
  },
  {
    label: '商品條碼',
    prop: 'barcode',
    width: '120',
  },
  {
    label: '商品編號',
    prop: 'product.pid',
    width: '80',
  },
  {
    label: '商品名稱',
    prop: 'product.name',
  },
]

export const SEARCH_OPTIONS = [
  { label: '儲位', value: 'storage_id' },
  { label: '商品名稱', value: 'product.name_like' },
]
