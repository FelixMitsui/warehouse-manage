
export const RULE = {
    email: [{ required: true, message: '不能為空', trigger: 'blur' }],
    password: [
      { required: true, message: '不能為空', trigger: 'blur' },
      { min: 6, message: '不能小於6個字元', trigger: 'blur' },
      { max: 16, message: '不能大於16個字元', trigger: 'blur' },
    ],
  }