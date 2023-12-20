<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <Table
        :tableColItems="TABLE_COL_ITEMS"
        :tableData="restockValue.restocks"
        settingLabel="設定"
        settingWidth="150"
      >
        <template #default>
          <el-button
            color="#00AEAE"
            size="default"
            disabled="true"
            @click="handleClick"
          >
            查看
          </el-button>
        </template>
      </Table>
      <Pagination :totalCount="restockValue.totalCount" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import useRestocksStore from '@/store/modules/restocks'
import { Restock } from '@/api/restock/type'
import { Product } from '@/api/product/type'
import { TABLE_COL_ITEMS } from './constants'
const restocksStore = useRestocksStore()

const router = useRouter()
const restockValue: { restocks: Restock<Product>[]; totalCount: number } =
  reactive({
    restocks: [],
    totalCount: 0,
  })

onMounted(async () => {
  try {
    await restocksStore.getRestocks()
    console.log(restocksStore.restocks)
    restockValue.restocks = restocksStore.restocks
    restockValue.totalCount = restocksStore.totalCount as number
  } catch (err) {
    console.log(err)
  }
})

watch(
  () => router.currentRoute.value,
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

const handleClick = () => {
  console.log('click')
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
