<template>
  <div class="container">
    <el-row :gutter="20" justify="center">
      <el-col :span="24" :xs="24" :sm="24" :md="24">
        <BarChart xName="日期" yName="進貨量" :data="currentMothRestockData" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
const currentMothRestockData = [
  { total: 24, date_at: '2023-12-1' },
  { total: 28, date_at: '2023-12-2' },
  { total: 33, date_at: '2023-12-3' },
  { total: 27, date_at: '2023-12-4' },
  { total: 29, date_at: '2023-12-5' },
  { total: 31, date_at: '2023-12-6' },
  { total: 28, date_at: '2023-12-7' },
  { total: 33, date_at: '2023-12-8' },
  { total: 28, date_at: '2023-12-9' },
  { total: 33, date_at: '2023-12-10' },
  { total: 28, date_at: '2023-12-11' },
  { total: 23, date_at: '2023-12-12' },
  { total: 37, date_at: '2023-12-13' },
  { total: 23, date_at: '2023-12-14' },
  { total: 24, date_at: '2023-12-15' },
  { total: 29, date_at: '2023-12-16' },
  { total: 30, date_at: '2023-12-17' },
  { total: 40, date_at: '2023-12-18' },
  { total: 48, date_at: '2023-12-19' },
]
</script>

<style scoped lang="scss"></style>
