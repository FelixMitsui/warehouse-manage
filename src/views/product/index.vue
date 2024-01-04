<template>
  <el-row :gutter="20">
    <el-col :span="24" class="header">
      <SearchBar placeholder="請輸入品名" :SEARCH_OPTIONS="SEARCH_OPTIONS" />
      <Dialog name="新增商品" :auth="usersStore.auth & 1">
        <!-- dialog slot -->
        <template #default="{ handleClose }">
          <Form
            :formValue="form"
            :RULE="RULE"
            @onSubmit="handleSubmit"
            :callback="handleClose"
          >
            <!-- form body  slot -->
            <template #body="{ form }">
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
              <el-form-item label="廠商" prop="supplier_name">
                <el-input v-model="form.supplier_name" />
              </el-form-item>
            </template>
            <!-- form footer slot -->
            <template #footer="{ handleSubmit, isLoading }">
              <el-button @click="handleClose">取消</el-button>
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
        :tableData="track.products"
        settingLabel="設定"
      >
        <!-- table slot -->
        <template #default="{ tableRow }">
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
                  @click="handleDelete(tableRow.id, handleClose)"
                >
                  確認
                </el-button>
              </div>
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
import useProductsStore from '@/store/modules/products'
import useUserStore from '@/store/modules/user'
import { Product } from '@/api/product/type'
import { ElMessage } from 'element-plus'
import { TABLE_COL_ITEMS, SELECT_OPTIONS, SEARCH_OPTIONS, RULE } from './config'
import Form from '@/components/Form/index.vue'
const productsStore = useProductsStore()
const usersStore = useUserStore()
const router = useRouter()

const form: Product = {
  cid: '',
  name: '',
  price: Infinity,
  spec: null,
  discount: Infinity,
  supplier_name: null,
}
const track: { products: Product[]; totalCount: number } = reactive({
  products: [],
  totalCount: 0,
})

onMounted(async () => {
  await productsStore.getProducts()
  track.products = productsStore.products
  track.totalCount = productsStore.totalCount as number
})

watch(
  () => router.currentRoute.value,
  async () => {
    await productsStore.getProducts()
    track.products = productsStore.products
    track.totalCount = productsStore.totalCount as number
  },
)
const handleSubmit = async ({ form }: { form: Product }): Promise<void> => {
  const formValue = { ...form, create_at: new Date() }
  await productsStore.createProduct(formValue)
  ElMessage({ type: 'success', message: '新增成功' })
}

const handleDelete = async (id: number, handleClose: () => void) => {
  await productsStore.deleteProduct(id)
  handleClose()
  ElMessage({ type: 'success', message: '刪除成功' })
}
</script>
<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
}
.el-col:first-child {
  padding: 0.5rem;
  border-radius: 4px;
  .el-form {
    justify-content: left;
  }
}
.el-row:last-child {
  margin-bottom: 0;
}
.grid-content {
  display: flex;
  border-radius: 4px;
  min-height: 36px;
}
.btn-group {
  display: flex;
  justify-content: center;
}
</style>
