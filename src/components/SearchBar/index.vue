<template>
  <el-form class="grid-content ep-bg-purple-dark">
    <el-form-item :label="label">
      <el-input :placeholder="placeholder" size="default" clearable></el-input>
    </el-form-item>
    <el-form-item class="ms-2" size="default">
      <el-button disabled color="#00AEAE" size="default">搜尋</el-button>
      <el-button disabled color="#00AEAE" size="default">刷新</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps(['label', 'placeholder'])
</script>
