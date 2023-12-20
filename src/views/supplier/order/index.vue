<template>
  <el-form :inline="true" :model="form" :rules="RULE" class="demo-form-inline">
    <el-form-item label="負責人">
      <el-input v-model="form.principal_name" clearable disabled="true" />
    </el-form-item>
    <el-form-item label="廠商">
      <el-input v-model="form.supplier_name" clearable disabled="true" />
    </el-form-item>
    <el-form-item
      label="出貨日期"
      prop="shipping_date"
      ref="shippingValidateRef"
    >
      <el-date-picker
        v-model="form.shipping_date"
        type="date"
        placeholder="選擇日期"
        clearable
      />
    </el-form-item>
  </el-form>
  <Table
    :tableColItems="TABLE_COL_ITEMS"
    :tableData="orderValue.products"
    settingLabel="進貨數"
    settingWidth="150"
  >
    <template #default="{ row }">
      <el-input-number
        v-model="row.count"
        :min="1"
        :max="10"
        size="small"
        @change="handleChange(row.count)"
      />
    </template>
  </Table>
  <el-button color="#00AEAE" size="default" @click="onSubmit">提交</el-button>
</template>

<script lang="ts" setup>
import { reactive, onMounted, toRaw, ref } from 'vue'
import { Product } from '@/api/product/type'
import useUserStore from '@/store/modules/user'
import useProductsStore from '@/store/modules/products'
import useRestocksStore from '@/store/modules/restocks'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { TABLE_COL_ITEMS, RULE } from './constants'
const $router = useRouter()
const userStore = useUserStore()
const productsStore = useProductsStore()
const restocksStore = useRestocksStore()
const shippingValidateRef = ref()
const form = reactive({
  principal_name: userStore.name,
  supplier_name: userStore.supplier_name as string,
  shipping_date: null,
})
const orderValue: { products: Product[]; totalCount: number } = reactive({
  products: productsStore.products,
  totalCount: 1,
})

onMounted(async () => {
  try {
    await productsStore.getProducts()
    productsStore.products.forEach((product) => {
      product.count = 1
    })

    orderValue.products = productsStore.products
    orderValue.totalCount = productsStore.totalCount as number
  } catch (err) {
    console.log(err)
  }
})
const handleChange = (num: number) => {
  console.log(num)
}
const onSubmit = async () => {
  await shippingValidateRef.value.validate()
  const formRaws = toRaw(form)
  const valueRaws = toRaw(orderValue)
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
  $router.push('/supplier/restock/progress')
}
</script>

<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

button {
  float: right;
}
</style>
