import { defineStore } from 'pinia'
import {
  reqGetInventories,
  reqCreateBarcode,
  reqUpdateInventoryLocation,
} from '@/api/inventory'
import type { Barcode } from '@/api/inventory/type'
import { Response } from '@/api/type'
import { InventoryState } from './types/inventoryType'
const useInventoriesStore = defineStore('Inventories', {
  state: (): InventoryState => {
    return {
      inventories: [],
      totalCount: 0,
    }
  },
  actions: {
    async getInventories() {
      const { data, status, totalCount }: Response<Barcode[]> =
        await reqGetInventories()
      this.inventories = data
      this.totalCount = totalCount
      return status
    },
    async createBarcode(barcodeData: Barcode) {
      const { status }: Response<Barcode> = await reqCreateBarcode(barcodeData)
      return status
    },
    async updateInventoryLocation(
      locationData: Pick<Barcode, 'id' | 'location_name'>,
    ) {
      const { data, status }: Response<Barcode> =
        await reqUpdateInventoryLocation(locationData)

      const targetIndex = this.inventories.findIndex(
        (item) => item.id === data.id,
      )
      if (targetIndex !== -1) {
        this.inventories[targetIndex].location_name = data?.location_name
      }
      return status
    },
    getters: {},
  },
})

export default useInventoriesStore
