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
  { total: 24, date_at: '2024-1-1' },
  { total: 28, date_at: '2024-1-2' },
]
</script>

<style scoped lang="scss"></style>
