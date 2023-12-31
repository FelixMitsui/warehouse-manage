<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <SearchBar
        :SEARCH_OPTIONS="SEARCH_OPTIONS"
        placeholder="請輸入搜尋內容"
      />
      <Dialog name="新增用戶" title="新增用戶" :auth="userStore.auth & 1">
        <!-- dialog slot -->
        <template #default="slot">
          <Form
            :formValue="form"
            :RULE="RULE"
            @onSubmit="handleSubmit"
            :callback="slot.handleClose"
          >
            <!-- form slot -->
            <template #body="{ form }">
              <el-form-item label="信箱" prop="email">
                <el-input v-model="form.email" />
              </el-form-item>
              <el-form-item label="密碼" prop="password">
                <el-input v-model="form.password" />
              </el-form-item>
              <el-form-item label="用戶名" prop="name">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-form-item label="身分" prop="role">
                <el-select v-model="form.role" placeholder="選擇身分">
                  <el-option
                    v-for="item in SELECT_OPTIONS"
                    :key="item"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="權限" prop="auth">
                <el-checkbox
                  :key="index"
                  v-for="(item, index) in CHECK_ITEMS"
                  @change="() => (form.auth ^= item.value)"
                  :label="item.label"
                  size="large"
                />
              </el-form-item>
            </template>
            <!-- form slot -->
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
    </el-col>
    <el-col :span="24">
      <Table
        :tableColItems="TABLE_COL_ITEMS"
        :tableData="track.users"
        settingLabel="設定"
        settingWidth="120"
      >
        <!-- table slot -->
        <template #default="{ tableRow, editRow, onEdit }">
          <Dialog
            name="刪除"
            title="是否確定刪除該筆資料?"
            size="small"
            :auth="userStore.auth & 4"
          >
            <template #default="{ handleClose }">
              <div class="btn-group">
                <el-button @click="handleClose">取消</el-button>
                <el-button
                  type="primary"
                  @click="
                    handleDelete(tableRow.id as string | number, handleClose)
                  "
                >
                  確認
                </el-button>
              </div>
            </template>
          </Dialog>
          <el-button
            color="#00AEAE"
            size="small"
            :disabled="!(userStore.auth & 2)"
            v-if="editRow !== tableRow.id"
            @click="onEdit(tableRow.id as string | number)"
          >
            編輯
          </el-button>
          <div class="edit-group" v-else>
            <el-button
              color="#00AEAE"
              size="small"
              @click="
                handleSave(onEdit, {
                  id: tableRow.id,
                  role: tableRow.role,
                  auth: tableRow.auth,
                  supplier_name: tableRow.supplier_name,
                })
              "
            >
              保存
            </el-button>
            <el-button color="#00AEAE" size="small" @click="onEdit">
              取消
            </el-button>
          </div>
        </template>
      </Table>
      <Pagination :totalCount="track.totalCount" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts" generic="T">
import Form from '@/components/Form/index.vue'
import Table from '@/components/Table/index.vue'
import { onMounted, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import useUsersStore from '@/store/modules/users'
import useUserStore from '@/store/modules/user'
import { User } from '@/api/user/type'
import { ElMessage } from 'element-plus'
import {
  TABLE_COL_ITEMS,
  SELECT_OPTIONS,
  SEARCH_OPTIONS,
  CHECK_ITEMS,
  RULE,
} from './config'
const usersStore = useUsersStore()
const userStore = useUserStore()

const form: User = {
  email: '',
  password: '',
  name: '',
  role: '',
  auth: 0,
}
const router = useRouter()
const track: { users: User[]; totalCount: number } = reactive({
  users: [],
  totalCount: 1,
})

onMounted(async () => {
  await usersStore.reqUsers()
  track.users = usersStore.users
  track.totalCount = usersStore.totalCount as number
})

watch(
  () => router.currentRoute.value,
  async () => {
    await usersStore.reqUsers()
    track.users = usersStore.users
    track.totalCount = usersStore.totalCount as number
  },
)

const handleSave = async (
  onEdit: () => void,
  formData: Pick<User, 'id' | 'role' | 'auth' | 'supplier_name'>,
) => {
  onEdit()
  await usersStore.updateUser(formData)
  ElMessage({ type: 'success', message: '更新成功' })
}
const handleSubmit = async ({ form }: { form: User }): Promise<void> => {
  const formValue = { ...form, create_at: new Date() }
  await usersStore.register(formValue)
  ElMessage({ type: 'success', message: '創建成功' })
}

const handleDelete = async (id: number | string, handleClose: () => void) => {
  try {
    await usersStore.deleteUser(id)
    handleClose()
    ElMessage({ type: 'success', message: '刪除成功' })
  } catch (err) {
    console.log(err)
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
}

.btn-group {
  display: flex;
  justify-content: center;
}
.edit-group {
  margin-left: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  :last-child {
    margin-top: 0.2rem;
    margin-left: 0;
  }
}
</style>
