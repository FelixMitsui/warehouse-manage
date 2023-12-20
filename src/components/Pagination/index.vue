<template>
  <div class="mt-2 container">
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize || 5"
      :disabled="disabled"
      layout="total, prev, pager, next"
      :total="Number(totalCount)"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const currentPage = ref(1)
const disabled = ref(false)
const { pageSize } = defineProps(['totalCount', 'pageSize'])

const handleCurrentChange = (value: number) => {
  let currentQuery = router.currentRoute.value.query
  const newQuery = { ...currentQuery, _page: value, _limit: pageSize || 5 }
  router.push({ query: newQuery })
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
