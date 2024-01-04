import { defineStore } from 'pinia'
import {
  reqGetProducts,
  reqCreateProduct,
  reqDeleteProduct,
} from '@/api/product'
import type { Product } from '@/api/product/type'
import { ProductsState } from './types/productType'
import { Response } from '@/api/type'
const useProductsStore = defineStore('Products', {
  state: (): ProductsState => {
    return {
      products: [],
      totalCount: 0,
    }
  },
  actions: {
    async getProducts(query?: any) {
      const { data, status, totalCount }: Response<Product[]> =
        await reqGetProducts(query)
      this.products = data
      this.totalCount = totalCount
      return status
    },
    async createProduct(formData: Product) {
      const { data, status }: Response<Product> =
        await reqCreateProduct(formData)

      this.products.push(data)
      return status
    },
    async deleteProduct(id: number) {
      const { status }: Response<Product> = await reqDeleteProduct(id)
      const targetIndex = this.products.findIndex((item) => item.id === id)
      if (targetIndex !== -1) {
        delete this.products[targetIndex]
      }
      return status
    },
  },
  getters: {
    productCount(state) {
      state.products.forEach((product) => {
        product.qty = 1
      })
    },
  },
})

export default useProductsStore
