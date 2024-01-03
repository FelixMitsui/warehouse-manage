import { defineStore } from 'pinia'
import { reqUsers, reqDeleteUser, reqRegister, reqUpdateUser } from '@/api/user'
import type { User, UserData } from '@/api/user/type'
import { Response } from '@/api/type'
import { UsersState } from './types/userType'

const useUsersStore = defineStore('Users', {
  state: (): UsersState => {
    return {
      users: [],
      totalCount: 0,
    }
  },
  actions: {
    async reqUsers() {
      const { data, status, totalCount }: Response<User[]> = await reqUsers()
      this.users = data
      this.totalCount = totalCount
      return status
    },
    async register(formData: User) {
      const { data, status }: Response<UserData<User>> =
        await reqRegister(formData)
      this.users.push(data.user)
      return status
    },
    async updateUser(
      formData: Pick<User, 'id' | 'role' | 'auth' | 'supplier_name'>,
    ) {
      const { data, status }: Response<User> = await reqUpdateUser(formData)
      const targetIndex = this.users.findIndex(
        (item) => item.id === formData.id,
      )
      if (targetIndex !== -1) {
        this.users[targetIndex] = data
      }
      return status
    },
    async deleteUser(id: number) {
      const { status }: Response<User> = await reqDeleteUser(id)
      const targetIndex = this.users.findIndex((item) => item.id === id)
      if (targetIndex !== -1) {
        delete this.users[targetIndex]
      }
      return status
    },
  },
  getters: {},
})

export default useUsersStore
