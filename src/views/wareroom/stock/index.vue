<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <SearchBar label="儲位名" placeholder="請輸入儲位名" />
    </el-col>
    <el-col :span="24">
      <Table
        :tableColItems="TABLE_COL_ITEMS"
        :tableData="stockValue.stocks"
        settingLabel="功能"
        settingWidth="150"
      >
        <template #default="{ row }">
          <Dialog name="變更儲位" title="當前欄位" :auth="userStore.auth & 2">
            <template #default="slot">
              <el-form :model="selectValue">
                <el-form-item label="當前儲位" :label-width="'140px'">
                  {{ row.storage_id }}
                </el-form-item>
                <el-form-item label="儲位" :label-width="'140px'">
                  <el-select v-model="selectValue" placeholder="選擇儲位">
                    <el-option
                      v-for="item in form"
                      :key="item"
                      :label="item"
                      :value="item"
                    />
                  </el-select>
                </el-form-item>
                <div class="btn-group">
                  <el-button @click="slot.handleClose">取消</el-button>
                  <el-button
                    type="primary"
                    @click="handleSubmit(row, slot.handleClose)"
                  >
                    確認
                  </el-button>
                </div>
              </el-form>
            </template>
          </Dialog>
        </template>
      </Table>
      <Pagination :totalCount="stockValue.totalCount" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import useStocksStore from '@/store/modules/stocks'
import { Storage, StockArea } from '@/api/stock/type'
import { ElMessage } from 'element-plus'
import { TABLE_COL_ITEMS } from './constants'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
const stocksStore = useStocksStore()
const $router = useRouter()
const form = ref(['RESTOCK', 'A01', 'A02', 'A03'])
const selectValue = ref<StockArea>(StockArea.RESTOCK)
const stockValue: { stocks: Storage[]; totalCount: number } = reactive({
  stocks: [],
  totalCount: 0,
})

onMounted(async () => {
  await stocksStore.getStocks()
  stockValue.stocks = stocksStore.stocks
  stockValue.totalCount = stocksStore.totalCount as number
})

watch(
  () => $router.currentRoute.value,
  async () => {
    await stocksStore.getStocks()
    stockValue.stocks = stocksStore.stocks
    stockValue.totalCount = stocksStore.totalCount as number
  },
)

const handleSubmit = async (value: any, handleClose: any) => {
  if (value.storage_id === selectValue.value) {
    ElMessage({ type: 'error', message: '無法選擇相同儲' })
    return
  } else {
    await stocksStore.updateStockStorage({
      id: value.id,
      storage_id: selectValue.value,
    })
    ElMessage({ type: 'success', message: '儲位已變更' })
    handleClose()
  }
}
</script>

<style lang="scss">
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

.btn-group {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
</style>
