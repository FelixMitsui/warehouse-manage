export const CHECK_ITEMS = [
  { label: '新增', value: 1 },
  { label: '修改', value: 2 },
  { label: '刪除', value: 4 },
]

export const SELECT_OPTIONS = [
  { label: '一般', value: 'normal' },
  { label: '廠商', value: 'supplier' },
  { label: '管理員', value: 'admin' },
]

export const SEARCH_OPTIONS = [
  { label: '信箱', value: 'email' },
  { label: '用戶名', value: 'name' },
]

export const RULE = {
  email: [
    { required: true, message: '不能為空', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: '必須是正確信箱格式',
      trigger: 'blur',
    },
  ],
  password: [{ required: true, message: '不能為空', trigger: 'blur' }],
  name: [{ required: true, message: '不能為空', trigger: 'blur' }],
}

export const TABLE_COL_ITEMS = [
  {
    label: '編號',
    prop: 'id',
    fixed: 'left',
    width: '80',
  },
  {
    label: '信箱',
    prop: 'email',
  },
  {
    label: '用戶名',
    prop: 'name',
    width: '150',
  },
  {
    label: '身分',
    prop: 'role',
    type: 'select',
    selectList: SELECT_OPTIONS,
    isEdit: true,
  },
  {
    label: '廠商名稱',
    prop: 'supplier_name',
    default: '無',
    isEdit: true,
  },
  {
    label: '權限',
    prop: 'auth',
    type: 'checkbox',
    checkboxList: CHECK_ITEMS,
    isEdit: true,
    width: '110',
    default: '無',
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
