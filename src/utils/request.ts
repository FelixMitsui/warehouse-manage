import axios, { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  url: import.meta.env.VITE_APP_BASE_API,
  baseURL: import.meta.env.VITE_SERVE,
  timeout: 5000,
  withCredentials: true,
})

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('TOKEN')
  if (token) {
    config.headers.authorization = 'Bearer ' + token
  }

  if (config.method === 'get') {
    const params = new URLSearchParams(location.search)
    config.params = {
      _limit: params.get('_limit') || 5,
      _page: params.get('_page'),
    }
  }
  return config
})

interface CustomResponse {
  totalCount: string
}

request.interceptors.response.use(
  (res) => {
    return {
      data: res.data,
      status: res.status,
      totalCount: res.headers['x-total-count'],
    } as AxiosResponse<any, any> & CustomResponse
  },
  (error) => {
    let message = ''

    const status = error.response.status
    switch (status) {
      case 401:
        message = '權限過期'
        break
      case 403:
        message = '無請求權限'
        break
      case 404:
        message = '無法找到數據'
        break
      case 500:
        message = '伺服器發生錯誤'
        break
      default:
        message = '網路發生問題'
        break
    }

    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(message)
  },
)
export default request
