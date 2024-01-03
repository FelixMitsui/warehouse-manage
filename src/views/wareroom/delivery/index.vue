<!-- parent.vue -->
<template>
  <div>
    {{ objRef }}
    <el-button @click="handleClick"></el-button>
  </div>
</template>

<script setup lang="ts">
import { ref,toRaw } from 'vue'
const obj: any = {
  fruit: '香蕉',
  soup: '酸辣湯',
  drink: '汽水',
}
const objRef = ref(obj)

const handleClick = () => {
  objRef.value.fruit = '西瓜'
  console.log(toRaw(objRef.value))
}
</script>

<style></style>
