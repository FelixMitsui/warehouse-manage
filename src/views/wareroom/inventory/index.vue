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
        :tableData="track.inventories"
        settingLabel="功能"
        settingWidth="100"
      >
        <template #default="{ tableRow }">
          <Dialog name="變更儲位" title="當前欄位" :auth="userStore.auth & 2">
            <template #default="slot">
              <Form
                :formValue="{ location: Location.RESTOCK }"
                @onSubmit="handleSubmit"
                :callback="slot.handleClose"
                :tableRow="tableRow"
              >
                <template #body="{ form }">
                  <el-form-item label="當前儲位" :label-width="'140px'">
                    {{ tableRow.location_name }}
                  </el-form-item>
                  <el-form-item label="儲位" :label-width="'140px'">
                    <el-select v-model="form.location" placeholder="選擇儲位">
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
      <Pagination :totalCount="track.totalCount" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import useInventoriesStore from '@/store/modules/inventories'
import useUserStore from '@/store/modules/user'
import { Barcode, Location } from '@/api/inventory/type'
import { ElMessage } from 'element-plus'
import { TABLE_COL_ITEMS, SEARCH_OPTIONS } from './config'
const userStore = useUserStore()
const inventoriesStore = useInventoriesStore()
const router = useRouter()
const track: { inventories: Barcode[]; totalCount: number } = reactive({
  inventories: [],
  totalCount: 0,
})

onMounted(async () => {
  await inventoriesStore.getInventories()
  track.inventories = inventoriesStore.inventories
  track.totalCount = inventoriesStore.totalCount as number
})

watch(
  () => router.currentRoute.value,
  async () => {
    await inventoriesStore.getInventories()
    track.inventories = inventoriesStore.inventories
    track.totalCount = inventoriesStore.totalCount as number
  },
)

const handleSubmit = async ({
  form,
  tableRow,
}: {
  form: { location: Location }
  tableRow: Barcode
}) => {
  if (tableRow.barcode_id === form.location) {
    ElMessage({ type: 'error', message: '無法選擇相同儲' })
    return
  } else {
    await inventoriesStore.updateInventoryLocation({
      id: tableRow.id,
      location_name: form.location,
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