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
        :tableData="stockValue.stocks"
        settingLabel="功能"
        settingWidth="100"
      >
        <template #default="{ tableRow }">
          <Dialog name="變更儲位" title="當前欄位" :auth="userStore.auth & 2">
            <template #default="slot">
              <Form
                :formValue="{ restock: StockArea.RESTOCK }"
                @onSubmit="handleSubmit"
                :callback="slot.handleClose"
                :tableRow="tableRow"
              >
                <template #body="{ form }">
                  <el-form-item label="當前儲位" :label-width="'140px'">
                    {{ tableRow.storage_id }}
                  </el-form-item>
                  <el-form-item label="儲位" :label-width="'140px'">
                    <el-select v-model="form.restock" placeholder="選擇儲位">
                      <el-option
                        v-for="item in ['RESTOCK', 'A01', 'A02', 'A03']"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                </template>
                <template #footer="{ handleSubmit, isLoading }">
                  <el-button @click="slot.handleClose">取消</el-button>
                  <el-button
                    type="primary"
                    :loading="isLoading"
                    @click="handleSubmit"
                  >
                    確認
                  </el-button>
                </template>
              </Form>
            </template>
          </Dialog>
        </template>
      </Table>
      <Pagination :totalCount="stockValue.totalCount" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import useStocksStore from '@/store/modules/stocks'
import { Storage, StockArea } from '@/api/stock/type'
import { ElMessage } from 'element-plus'
import { TABLE_COL_ITEMS, SEARCH_OPTIONS } from './config'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
const stocksStore = useStocksStore()
const router = useRouter()
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
  () => router.currentRoute.value,
  async () => {
    await stocksStore.getStocks()
    stockValue.stocks = stocksStore.stocks
    stockValue.totalCount = stocksStore.totalCount as number
  },
)

const handleSubmit = async ({
  form,
  tableRow,
}: {
  form: { restock: StockArea }
  tableRow: Storage
}) => {
  if (tableRow.storage_id === form.restock) {
    ElMessage({ type: 'error', message: '無法選擇相同儲' })
    return
  } else {
    await stocksStore.updateStockStorage({
      id: tableRow.id,
      storage_id: form.restock,
    })
    ElMessage({ type: 'success', message: '儲位已變更' })
  }
}
</script>

<style scoped lang="scss">
.el-row:last-child {
  margin-bottom: 0;
  .el-form {
    display: flex;
    justify-content: center;
  }
}

.el-col:first-child {
  padding: 0.5rem;
  border-radius: 4px;
}
</style>
