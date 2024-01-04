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
        settingWidth="150"
      >
        <template #default>
          <el-button color="#00AEAE" size="default" disabled="true">
            查看
          </el-button>
        </template>
      </Table>
      <Pagination :totalCount="track.totalCount" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import useRestocksStore from '@/store/modules/restocks'
import { Restock } from '@/api/restock/type'
import { Product } from '@/api/product/type'
import { TABLE_COL_ITEMS, SEARCH_OPTIONS } from './config'
import Table from '@/components/Table/index.vue'
const restocksStore = useRestocksStore()

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
</script>
<style lang="scss">
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
