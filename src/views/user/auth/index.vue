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
          <Form :formValue="{ auth: 0 }" :RULE="RULE">
            <!-- form slot -->
            <template #formArea="{ form }">
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
                    :label="item.name"
                    :value="item.category"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="權限" prop="auth">
                <el-checkbox
                  :key="index"
                  v-for="(item, index) in CHECK_ITEMS"
                  @change="() => (form.auth ^= item.value)"
                  :label="item.name"
                  size="large"
                />
              </el-form-item>
            </template>
            <!-- form slot -->
            <template #btnArea="{ form, validate }">
              <el-button @click="slot.handleClose">取消</el-button>
              <el-button
                type="primary"
                @click="handleSubmit(null, form, validate, slot.handleClose)"
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
        :tableData="userValue.users"
        settingLabel="設定"
        settingWidth="120"
      >
        <!-- table slot -->
        <template #default="{ row, editRow, handleEdit }">
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
                  @click="handleDelete(row.id, handleClose)"
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
            v-if="editRow !== row.id"
            @click="handleEdit(row.id)"
          >
            編輯
          </el-button>
          <el-button
            color="#00AEAE"
            size="small"
            v-else
            @click="
              handleSave(handleEdit, {
                id: row.id,
                role: row.role,
                auth: row.auth,
              })
            "
          >
            保存
          </el-button>
        </template>
      </Table>
      <Pagination :totalCount="userValue.totalCount" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
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

const router = useRouter()
const userValue: { users: User[]; totalCount: number } = reactive({
  users: [],
  totalCount: 1,
})

onMounted(async () => {
  try {
    await usersStore.reqUsers()
    userValue.users = usersStore.users
    userValue.totalCount = usersStore.totalCount as number
  } catch (err) {
    console.log(err)
  }
})

watch(
  () => router.currentRoute.value,
  async () => {
    try {
      await usersStore.reqUsers()
      userValue.users = usersStore.users
      userValue.totalCount = usersStore.totalCount as number
    } catch (err) {
      console.log(err)
    }
  },
)

const handleSave = async (
  handleEdit: () => void,
  formData: Pick<User, 'id' | 'role' | 'auth'>,
) => {
  handleEdit()
  await usersStore.updateUser(formData)
  ElMessage({ type: 'success', message: '更新成功' })
}
const handleSubmit = async (
  index: number | null,
  form: User,
  validate: () => boolean,
  handleClose: () => void,
) => {
  const isValid = await validate()
  if (!isValid) return

  const formValue = { ...form, create_at: new Date() }
  await usersStore.register(formValue)
  handleClose()
  ElMessage({ type: 'success', message: '創建成功' })
}

const handleDelete = async (id: number, handleClose: () => void) => {
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
  .el-form {
    justify-content: left;
  }
}

.btn-group {
  display: flex;
  justify-content: center;
}
</style>
