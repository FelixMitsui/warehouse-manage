<template>
  <div class="container">
    <el-row :gutter="20" justify="center">
      <el-col :span="24" :xs="24" :sm="24" :md="12">
        <BarChart xName="日期" yName="進貨量" :data="currentMothRestockData" />
      </el-col>
      <el-col :span="24" :xs="24" :sm="24" :md="12">
        <BarChart xName="日期" yName="出貨量" :data="currentMothDeliveryData" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
const currentMothRestockData = [
  { total: 24, date_at: '2024-1-1' },
  { total: 28, date_at: '2024-1-2' },
  { total: 31, date_at: '2024-1-3' },
  { total: 28, date_at: '2024-1-4' },
  { total: 24, date_at: '2024-1-5' },
  { total: 36, date_at: '2024-1-6' },
  { total: 24, date_at: '2024-1-7' },
  { total: 28, date_at: '2024-1-8' },
  { total: 24, date_at: '2024-1-9' },
  { total: 24, date_at: '2024-1-10' },
  { total: 24, date_at: '2024-1-11' },
  { total: 33, date_at: '2024-1-12' },
  { total: 24, date_at: '2024-1-13' },
  { total: 28, date_at: '2024-1-14' },
  { total: 28, date_at: '2024-1-15' },
  { total: 27, date_at: '2024-1-16' },
  { total: 33, date_at: '2024-1-17' },
  { total: 28, date_at: '2024-1-18' },
  { total: 24, date_at: '2024-1-19' },
  { total: 30, date_at: '2024-1-20' },
  { total: 24, date_at: '2024-1-21' },
  { total: 28, date_at: '2024-1-22' },
]
const currentMothDeliveryData = [
{ total: 24, date_at: '2024-1-1' },
  { total: 27, date_at: '2024-1-2' },
  { total: 30, date_at: '2024-1-3' },
  { total: 27, date_at: '2024-1-4' },
  { total: 24, date_at: '2024-1-5' },
  { total: 34, date_at: '2024-1-6' },
  { total: 30, date_at: '2024-1-7' },
  { total: 29, date_at: '2024-1-8' },
  { total: 26, date_at: '2024-1-9' },
  { total: 24, date_at: '2024-1-10' },
  { total: 27, date_at: '2024-1-11' },
  { total: 33, date_at: '2024-1-12' },
  { total: 24, date_at: '2024-1-13' },
  { total: 23, date_at: '2024-1-14' },
  { total: 26, date_at: '2024-1-15' },
  { total: 25, date_at: '2024-1-16' },
  { total: 33, date_at: '2024-1-17' },
  { total: 26, date_at: '2024-1-18' },
  { total: 24, date_at: '2024-1-19' },
  { total: 29, date_at: '2024-1-20' },
  { total: 24, date_at: '2024-1-21' },
  { total: 25, date_at: '2024-1-22' },
]
</script>

<style scoped lang="scss"></style>
