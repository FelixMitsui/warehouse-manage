export const TABLE_COL_ITEMS = [
  {
    label: '編號',
    prop: 'id',
    fixed: 'left',
    width: '80',
  },
  {
    label: '分類',
    prop: 'cid',
    width: '100',
  },
  {
    label: '品名',
    prop: 'name',
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
    default: '無',
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

export const RULE = {
  shipping_date: [{ required: true, message: '不能為空', trigger: 'blur' }],
}
