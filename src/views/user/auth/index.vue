<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <SearchBar label="姓名" placeholder="請輸入姓名" />
      <Dialog name="新增用戶" title="新增用戶" :auth="userStore.auth & 1">
        <template #default="slot">
          <el-form :model="form" ref="formRef" :rules="RULE">
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
            <div class="btn-group">
              <el-button @click="slot.handleClose">取消</el-button>
              <el-button
                type="primary"
                @click="handleSubmit(null, slot.handleClose)"
              >
                確認
              </el-button>
            </div>
          </el-form>
        </template>
      </Dialog>
    </el-col>
    <el-col :span="24">
      <Table
        :tableColItems="TABLE_COL_ITEMS"
        :tableData="userValue.users"
        settingLabel="設定"
        settingWidth="150"
        :editRowRef="editRowRef"
      >
        <template #default="{ row }">
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
            v-if="editRowRef !== row.id"
            @click="handleOpenEdit(row.id)"
          >
            編輯
          </el-button>
          <el-button
            color="#00AEAE"
            size="small"
            v-else
            @click="handleSave({ id: row.id, role: row.role, auth: row.auth })"
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
import { onMounted, ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import useUsersStore from '@/store/modules/users'
import useUserStore from '@/store/modules/user'
import { User } from '@/api/user/type'
import { ElMessage, ElForm } from 'element-plus'
import { TABLE_COL_ITEMS, SELECT_OPTIONS, CHECK_ITEMS, RULE } from './constants'
const usersStore = useUsersStore()
const userStore = useUserStore()

const $router = useRouter()
const userValue: { users: User[]; totalCount: number } = reactive({
  users: [],
  totalCount: 1,
})
const form: any = reactive({ auth: 0 })
const formRef = ref<typeof ElForm | null>(null)
const editRowRef = ref<number | null>(null)

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
  () => $router.currentRoute.value,
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

const handleOpenEdit = (id: number) => {
  editRowRef.value = id
}
const handleSave = async (formData: Pick<User, 'id' | 'role' | 'auth'>) => {
  editRowRef.value = null
  await usersStore.updateUser(formData)
  ElMessage({ type: 'success', message: '更新成功' })
}
const handleSubmit = async (index: any, handleClose: () => void) => {
  const isValid = await formRef.value?.validate()
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

.btn-group {
  display: flex;
  justify-content: center;
}
</style>
