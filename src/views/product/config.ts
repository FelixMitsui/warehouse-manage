export const SELECT_OPTIONS = [
  { category: '100100', name: '玩具' },
  { category: '100200', name: '文具' },
]

export const RULE = {
  name: [
    { required: true, message: '不能為空', trigger: 'blur' },
    { min: 6, message: '不能小於6個字元', trigger: 'blur' },
  ],
  price: [{ required: true, message: '不能為空', trigger: 'blur' }],
  discount: [{ required: true, message: '不能為空', trigger: 'blur' }],
  supplier_name: [{ required: true, message: '不能為空', trigger: 'blur' }],
}
export const TABLE_COL_ITEMS = [
  {
    label: '編號',
    prop: 'id',
    width: '80',
  },
  {
    label: '商品名稱',
    prop: 'name',
  },
  {
    label: '分類',
    prop: 'cid',
  },
  {
    label: '價格',
    prop: 'price',
    width: '80',
  },
  {
    label: '折扣',
    prop: 'discount',
    width: '80',
  },
  {
    label: '規格',
    prop: 'spec',
    width: '80',
    default: '無',
  },
  {
    label: '廠商',
    prop: 'supplier_name',
  },
  {
    label: '創建時間',
    prop: 'create_at',
    width: '100',
    method: (value: string): string => {
      const date = new Date(value)
      return date.toLocaleDateString()
    },
  },
]

export const SEARCH_OPTIONS = [
  { label: '商品名稱', value: 'name_like' },
  { label: '分類', value: 'cid' },
]
