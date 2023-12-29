export const TABLE_COL_ITEMS = [
  {
    label: '編號',
    prop: 'id',
    fixed: 'left',
    width: '80',
  },
  {
    label: '進貨數',
    prop: 'products',
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
    transform: ['未完成', '已完成'],
  },
  {
    label: '出貨時間',
    prop: 'shipping_date',
    method: (value: string): string => {
      const date = new Date(value)
      return date.toLocaleDateString()
    },
  },
  {
    label: '創建時間',
    prop: 'create_at',
    method: (value: string): string => {
      const date = new Date(value)
      return date.toLocaleDateString()
    },
  },
]

export const SEARCH_OPTIONS = [{ label: '編號', value: 'id' }]
