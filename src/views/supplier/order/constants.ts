export const TABLE_COL_ITEMS = [
  {
    label: '編號',
    prop: 'id',
    fixed: 'left',
    width: '100',
  },
  {
    label: '分類',
    prop: 'cid',
    fixed: 'left',
    width: '100',
  },
  {
    label: '品名',
    prop: 'name',
    fixed: 'left',
  },
  {
    label: '價格',
    prop: 'price',
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

export const RULE = {
  shipping_date: [{ required: true, message: '不能為空', trigger: 'blur' }],
}
