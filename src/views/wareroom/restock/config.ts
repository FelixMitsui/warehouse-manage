export const SEARCH_OPTIONS = [{ label: '廠商', value: 'supplier_name' }]

export const TABLE_COL_ITEMS = [
  {
    label: '編號',
    prop: 'id',
    fixed: 'left',
    width: '80',
  },
  {
    label: '廠商',
    prop: 'supplier_name',
  },
  {
    label: '進貨數',
    prop: 'products',
    width: '100',
    method: (value: any): number => {
      const qty = value.reduce(
        (total: number, current: any) => total + current.qty,
        0,
      )
      return qty
    },
  },
  {
    label: '狀態',
    prop: 'status',
    width: '100',
    transform: ['未完成', '完成'],
  },
  {
    label: '創建時間',
    prop: 'create_at',
    width: '120',
    method: (value: string): string => {
      const date = new Date(value)
      return date.toLocaleDateString()
    },
  },
]
