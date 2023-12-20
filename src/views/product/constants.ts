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
}
export const TABLE_COL_ITEMS = [
  {
    label: '編號',
    prop: 'id',
    fixed: 'left',
    width: '80',
  },
  {
    label: '商品名',
    prop: 'name',
    fixed: 'left',
  },
  {
    label: '分類',
    prop: 'cid',
    fixed: 'left',
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
  },
  {
    label: '創建時間',
    prop: 'create_at',
    width: '100',
  },
]
