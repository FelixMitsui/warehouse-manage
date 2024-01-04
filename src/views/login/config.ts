export const RULE = {
  email: [
    { required: true, message: '不能為空', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: '請輸入信箱格式',
      trigger: ['blur'],
    },
  ],
  password: [
    { required: true, message: '不能為空', trigger: 'blur' },
    { min: 6, message: '不能小於6個字元', trigger: 'blur' },
    { max: 16, message: '不能大於16個字元', trigger: 'blur' },
  ],
}
