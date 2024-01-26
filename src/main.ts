import { createApp } from 'vue'
import App from '@/App.vue'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import globalComponent from '@/components'
import pinia from './store'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from './router'

const app = createApp(App)
zhCn.el.pagination.total = '總共: {total} 筆'
zhCn.el.table.emptyText = '暫無數據'
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(pinia)
app.use(globalComponent)
app.use(router)
import '@/router/intercept'
app.mount('#app')
