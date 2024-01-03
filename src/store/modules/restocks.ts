import { defineStore } from 'pinia'
import {
  reqGetRestocks,
  reqCreateRestock,
  reqUpdateRestockStatus,
  reqGetSupplierProducts,
} from '@/api/restock'

import type { Restock } from '@/api/restock/type'
import { RestocksState } from './types/restockType'
import { Product } from '@/api/product/type'
import { Response } from '@/api/type'

const useRestocksStore = defineStore('Restocks', {
  state: (): RestocksState => {
    return {
      restocks: [],
      totalCount: 0,
    }
  },
  actions: {
    async getRestocks() {
      const { data, status, totalCount }: Response<Restock<Product>[]> =
        await reqGetRestocks()
      this.restocks = data
      this.totalCount = totalCount
      return status
    },
    async createRestock(data: Restock<Product>) {
      const { status }: Response<null> = await reqCreateRestock(data)
      return status
    },
    async updateRestockStatus(id: number) {
      const { data, status }: Response<Restock<Product>> =
        await reqUpdateRestockStatus(id)

      const currentIndex = this.restocks.findIndex(
        (item: Restock<Pick<Product, 'id'>>) => item.id == data.id,
      )
      if (currentIndex !== -1) {
        this.restocks[currentIndex].status = data.status
      }
      return status
    },
  },
  getters: {},
})

export default useRestocksStore
