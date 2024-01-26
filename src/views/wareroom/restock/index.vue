<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <SearchBar
        :SEARCH_OPTIONS="SEARCH_OPTIONS"
        placeholder="請輸入搜尋內容"
      />
    </el-col>
    <el-col :span="24">
      <Table
        :tableColItems="TABLE_COL_ITEMS"
        :tableData="track.restocks"
        settingLabel="設定"
        settingWidth="80"
      >
        <template #default="{ tableRow, index }">
          <el-button
            color="#00AEAE"
            size="default"
            :disabled="Boolean(tableRow.status)"
            @click="handleInventory(index)"
          >
            入庫
          </el-button>
        </template>
      </Table>
      <Pagination :totalCount="track.totalCount" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import useRestocksStore from '@/store/modules/restocks'
import useInventoriesStore from '@/store/modules/inventories'
import { Location } from '@/api/inventory/type'
import { Restock } from '@/api/restock/type'
import { Product } from '@/api/product/type'
import ShortUniqueId from 'short-unique-id'
import { ElMessage } from 'element-plus'
import { TABLE_COL_ITEMS, SEARCH_OPTIONS } from './config'
import Table from '@/components/Table/index.vue'
const restocksStore = useRestocksStore()
const inventoriesStore = useInventoriesStore()
const router = useRouter()
const track: { restocks: Restock<Product>[]; totalCount: number } = reactive({
  restocks: [],
  totalCount: 0,
})

onMounted(async () => {
  await restocksStore.getRestocks()
  track.restocks = restocksStore.restocks
  track.totalCount = restocksStore.totalCount as number
})

watch(
  () => router.currentRoute.value,
  async () => {
    await restocksStore.getRestocks()
    track.restocks = restocksStore.restocks
    track.totalCount = restocksStore.totalCount as number
  },
)

const handleInventory = async (index: number) => {
  const valueRaw = toRaw(track.restocks)

  const inventories = []

  const uid = new ShortUniqueId({ length: 10 })
  for (let i = 0; i < valueRaw[index].products.length; i++) {
    let j = 0
    const qty = valueRaw[index].products[i].qty as number
    const product = valueRaw[index].products[i]

    while (j < qty) {
      let productValue = Object.assign(
        {},
        {
          pid: product.id as number,
          name: product.name,
        },
      )
      const inventoryEntry = {
        barcode_id: uid.rnd(),
        location_name: Location.RESTOCK,
        product: productValue,
      }
      const barcodeInfo = await inventoriesStore.createBarcode(inventoryEntry)
      inventories.push(barcodeInfo)

      j++
    }
  }

  try {
    const result = await Promise.all(inventories)
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
  }
}
</script>
<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col:first-child {
  padding: 0.5rem;
  border-radius: 4px;
  .el-form {
    justify-content: left;
  }
}
.grid-content {
  display: flex;
  border-radius: 4px;
  min-height: 36px;
}
</style>
