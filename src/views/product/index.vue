<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <SearchBar label="商品" placeholder="請輸入品名" />
      <Dialog name="新增商品" :auth="usersStore.auth & 1">
        <template #default="slot">
          <el-form :model="form" ref="formRef" :rules="RULE">
            <el-form-item label="商品名" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="分類">
              <el-select v-model="form.cid" placeholder="選擇分類">
                <el-option
                  v-for="item in SELECT_OPTIONS"
                  :key="item"
                  :label="item.name"
                  :value="item.category"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="價格" prop="price">
              <el-input v-model="form.price" />
            </el-form-item>
            <el-form-item label="折扣" prop="discount">
              <el-input v-model="form.discount" placeholder="ex:0.87" />
            </el-form-item>
            <el-form-item label="規格" prop="spec">
              <el-input v-model="form.spec" />
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
        :tableData="productValue.products"
        settingLabel="設定"
      >
        <template #default="{ row }">
          <Dialog
            name="刪除"
            title="是否要刪除該筆資料?"
            :auth="usersStore.auth & 3"
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
        </template>
      </Table>
      <Pagination :totalCount="productValue.totalCount" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { Ref, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import useProductsStore from '@/store/modules/products'
import useUserStore from '@/store/modules/user'
import { Product } from '@/api/product/type'
import { ElForm, ElMessage } from 'element-plus'
import { TABLE_COL_ITEMS, SELECT_OPTIONS, RULE } from './constants'
const productsStore = useProductsStore()
const usersStore = useUserStore()
const router = useRouter()
const productValue: { products: Product[]; totalCount: number } = reactive({
  products: [],
  totalCount: 0,
})

const form: any = reactive({ spec: null })
const formRef: Ref<typeof ElForm | null> = ref(null)

onMounted(async () => {
  await productsStore.getProducts()
  productValue.products = productsStore.products
  productValue.totalCount = productsStore.totalCount as number
})

watch(
  () => router.currentRoute.value,
  async () => {
    await productsStore.getProducts()
    productValue.products = productsStore.products
    productValue.totalCount = productsStore.totalCount as number
  },
)
const handleSubmit = async (index: any, handleClose: () => void) => {
  const isValid = await formRef.value?.validate()
  if (!isValid) return
  const formValue = { ...form, create_at: new Date() }
  await productsStore.createProduct(formValue)
  handleClose()
  ElMessage({ type: 'success', message: '新增成功' })
}

const handleDelete = async (id: number, handleClose: () => void) => {
  await productsStore.deleteProduct(id)
  handleClose()
  ElMessage({ type: 'success', message: '刪除成功' })
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
