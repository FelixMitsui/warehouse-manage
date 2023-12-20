import { createRouter, createWebHistory } from 'vue-router'
import { commonRoute } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: commonRoute,

  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})
export default router
