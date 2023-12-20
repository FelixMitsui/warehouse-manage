<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <SearchBar label="廠商" placeholder="請輸入廠商名" />
    </el-col>
    <el-col :span="24">
      <Table
        :tableColItems="TABLE_COL_ITEMS"
        :tableData="restockValue.restocks"
        settingLabel="設定"
        settingWidth="150"
      >
        <template #default="{ row, index }">
          <el-button
            color="#00AEAE"
            size="default"
            :disabled="Boolean(row.status)"
            @click="handleStock(index)"
          >
            入庫
          </el-button>
        </template>
      </Table>
      <Pagination :totalCount="restockValue.totalCount" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import useRestocksStore from '@/store/modules/restocks'
import useStocksStore from '@/store/modules/stocks'
import { StockArea } from '@/api/stock/type'
import { Restock } from '@/api/restock/type'
import { Product } from '@/api/product/type'
import ShortUniqueId from 'short-unique-id'
import { ElMessage } from 'element-plus'
import { TABLE_COL_ITEMS } from './constants'
const restocksStore = useRestocksStore()
const stocksStore = useStocksStore()
const $router = useRouter()
const restockValue: { restocks: Restock<Product>[]; totalCount: number } =
  reactive({
    restocks: [],
    totalCount: 0,
  })

onMounted(async () => {
  try {
    await restocksStore.getRestocks()
    restockValue.restocks = restocksStore.restocks
    restockValue.totalCount = restocksStore.totalCount as number
  } catch (err) {
    console.log(err)
  }
})

watch(
  () => $router.currentRoute.value,
  async () => {
    try {
      await restocksStore.getRestocks()
      restockValue.restocks = restocksStore.restocks
      restockValue.totalCount = restocksStore.totalCount as number
    } catch (err) {
      console.log(err)
    }
  },
)

const handleStock = async (index: any) => {
  const valueRaw = toRaw(restockValue.restocks)

  const addStockPromises = []

  const uid = new ShortUniqueId({ length: 10 })
  for (let i = 0; i < valueRaw[index].products.length; i++) {
    let j = 0
    const count = valueRaw[index].products[i].count as number
    const product = valueRaw[index].products[i]

    while (j < count) {
      let productValue = Object.assign(
        {},
        {
          pid: product.id,
          name: product.name,
        },
      )
      const stockEntry = {
        barcode: uid.rnd(),
        storage_id: StockArea.RESTOCK,
        product: productValue,
      }
      const addStockPromise = await stocksStore.createStock(stockEntry)
      addStockPromises.push(addStockPromise)

      j++
    }
  }

  try {
    const result = await Promise.all(addStockPromises)
    if (result) {
      await restocksStore.updateRestockStatus(valueRaw[index].id as number)
      ElMessage({
        type: 'success',
        message: '條碼已成生',
      })
    }
  } catch (err) {
    ElMessage({
      type: 'error',
      message: '條碼生成失敗',
    })
    console.log(err)
  }
}
</script>
<style lang="scss">
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  display: flex;
  border-radius: 4px;
  min-height: 36px;
}
.primary-button {
  background: $primary-button;
}
</style>
