import router from './index'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user'
import pinia from '@/store'
nprogress.configure({ showSpinner: false })
const userStore = useUserStore(pinia)

router.beforeEach(async (to, from, next) => {
  nprogress.start()

  const token = localStorage.getItem('TOKEN')

  if (token && token !== undefined) {
    if (to.path == '/login') {
      if (userStore.role === 'supplier') {
        next({ path: '/supplier' })
      } else {
        next({ path: '/' })
      }
    } else {
      if (userStore.email !== '') {
        next()
      } else {
        // refresh page lost data, request api again.
        try {
          await userStore.reqAuth()

          next({ ...to })
        } catch (error) {
          userStore.reqLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

router.afterEach((to, from) => {
  document.title = `倉儲管理 - ${to.meta.title}`
  nprogress.done()
})
