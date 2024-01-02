<template>
  <Form :formValue="formValue" :RULE="RULE" @onSubmit="handleSubmit">
    <!-- form slot -->
    <template #body="{ form }">
      <el-form-item label="負責人">
        <el-input v-model="form.principal_name" clearable disabled="true" />
      </el-form-item>
      <el-form-item label="廠商">
        <el-input v-model="form.supplier_name" clearable disabled="true" />
      </el-form-item>
      <el-form-item label="出貨日期" prop="shipping_date">
        <el-date-picker
          v-model="form.shipping_date"
          type="date"
          placeholder="選擇日期"
          clearable
        />
      </el-form-item>
    </template>
    <template #footer="{ handleSubmit, isLoading }">
      <div class="btn-group">
        <Table
          :tableColItems="TABLE_COL_ITEMS"
          :tableData="track.products"
          settingLabel="進貨數"
          settingWidth="150"
        >
          <template #default="{ tableRow }">
            <el-input-number
              v-model="tableRow.qty"
              :min="1"
              :max="10"
              size="small"
            />
          </template>
        </Table>
        <el-button
          color="#00AEAE"
          size="default"
          :loading="isLoading"
          @click="handleSubmit"
        >
          提交
        </el-button>
      </div>
    </template>
  </Form>
</template>

<script lang="ts" setup>
import { reactive, onMounted, toRaw } from 'vue'
import { Product } from '@/api/product/type'
import { Restock } from '@/api/restock/type'
import useUserStore from '@/store/modules/user'
import useProductsStore from '@/store/modules/products'
import useRestocksStore from '@/store/modules/restocks'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { TABLE_COL_ITEMS, RULE } from './config'
const router = useRouter()
const userStore = useUserStore()
const productsStore = useProductsStore()
const restocksStore = useRestocksStore()

// default form value
const formValue = {
  principal_name: userStore.name,
  supplier_name: userStore.supplier_name as string,
  shipping_date: null,
}
const track: { products: Product[]; totalCount: number } = reactive({
  products: productsStore.products,
  totalCount: 1,
})

onMounted(async () => {
  await productsStore.getProducts()
  productsStore.productCount
  track.products = productsStore.products
  track.totalCount = productsStore.totalCount as number
})

const handleSubmit = async ({
  form,
}: {
  form: Pick<
    Restock<null>,
    'principal_name' | 'supplier_name' | 'shipping_date'
  >
}) => {
  const formRaws = toRaw(form)
  const valueRaws = toRaw(track)
  const combineData = {
    ...formRaws,
    products: [...valueRaws.products],
    create_at: new Date(),
    status: 0,
  }
  await restocksStore.createRestock(combineData)
  ElMessage({
    type: 'success',
    message: '創建成功',
  })
  router.push('/supplier/restock/progress')
}
</script>

<style scoped lang="scss">
.btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .el-button {
    margin: 1rem auto;
    align-self: center;
  }
}
</style>
