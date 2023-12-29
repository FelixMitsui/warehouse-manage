import { defineStore } from 'pinia'
import { reqLogin, reqAuth } from '@/api/user'
import type { User, UserData } from '@/api/user/type'
import { Response } from '@/api/type'
import { UserState } from './types/userType'
import { commonRoute, authRoute, otherRoute } from '@/router/routes'
import { cloneDeep } from 'lodash'
import { filterRoute } from '@/utils/tools/filterRoute'
import router from '@/router'
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      menuRoutes: commonRoute,
      email: '',
      role: '',
      auth: 0,
      name: '',
      supplier_name: '',
    }
  },
  actions: {
    async reqLogin(formData: Pick<User, 'email' | 'password'>) {
      const {
        data,
        status,
      }: Response<
        UserData<
          Pick<User, 'name' | 'auth' | 'email' | 'role' | 'supplier_name'>
        >
      > = await reqLogin(formData)

      const { name, auth, email, role, supplier_name } = data.user

      localStorage.setItem('TOKEN', data.accessToken as string)
      this.email = email || (formData && formData.email) || ''
      this.role = role
      this.name = name
      if (role === 'supplier') {
        this.supplier_name = supplier_name
      }
      this.auth = auth
      const userAuthRoute: any[] = filterRoute(
        cloneDeep(authRoute),
        role as string,
      )

      this.menuRoutes = [...commonRoute, ...userAuthRoute, otherRoute]
      ;[...userAuthRoute, otherRoute].forEach((route: any) => {
        router.addRoute(route)
      })
      return status
    },
    async reqAuth() {
      const {
        data,
        status,
      }: Response<
        UserData<
          Pick<User, 'name' | 'auth' | 'email' | 'role' | 'supplier_name'>
        >
      > = await reqAuth()

      const { name, auth, email, role, supplier_name } = data.user
      localStorage.setItem('TOKEN', data.accessToken)
      this.email = email || ''
      this.role = role
      this.name = name
      if (role === 'supplier') {
        this.supplier_name = supplier_name
      }
      this.auth = auth
      const userAuthRoute = filterRoute(cloneDeep(authRoute), role)

      this.menuRoutes = [...commonRoute, ...userAuthRoute, otherRoute]
      ;[...userAuthRoute, otherRoute].forEach((route: any) => {
        router.addRoute(route)
      })
      return status
    },
    reqLogout() {
      this.email = ''
      this.name = ''
      localStorage.clear()
    },
  },
  getters: {},
})

export default useUserStore
