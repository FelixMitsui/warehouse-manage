import { defineStore } from 'pinia'
import {
  reqGetStocks,
  reqCreateStock,
  reqUpdateStockStorage,
} from '@/api/stock'
import type { Storage } from '@/api/stock/type'
import { Response } from '@/api/type'
import { StocksState } from './types/stockType'
const useStocksStore = defineStore('Stocks', {
  state: (): StocksState => {
    return {
      stocks: [],
      totalPage: 1,
      totalCount: 0,
    }
  },
  actions: {
    async getStocks() {
      const { data, status, totalCount }: Response<Storage[]> =
        await reqGetStocks()
      this.stocks = data
      this.totalCount = totalCount
      return status
    },
    async createStock(storageData: Storage) {
      const { status }: Response<Storage> = await reqCreateStock(storageData)
      return status
    },
    async updateStockStorage(storageData: Pick<Storage, 'id' | 'storage_id'>) {
      const { data, status }: Response<Storage> =
        await reqUpdateStockStorage(storageData)

      const targetIndex = this.stocks.findIndex(
        (item) => item.barcode === data.barcode,
      )
      if (targetIndex !== -1) {
        this.stocks[targetIndex].storage_id = data?.storage_id
      }
      return status
    },
    getters: {},
  },
})

export default useStocksStore
