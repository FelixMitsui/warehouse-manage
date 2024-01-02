<template>
  <div class="mt-4 container">
    <el-input
      v-model="inputRef"
      :placeholder="placeholder"
      class="input-with-select"
    >
      <template #prepend>
        <el-select v-model="selectRef" placeholder="分類" style="width: auto">
          <el-option
            v-for="(item, index) in SEARCH_OPTIONS"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
      <template #append>
        <el-button :icon="Search" @click="handleSearch" />
      </template>
    </el-input>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
const router = useRouter()
const selectRef = ref<string>('')
const inputRef = ref<string>('')
defineProps(['placeholder', 'SEARCH_OPTIONS'])

const handleSearch = () => {
  router.push({
    query: { [selectRef.value]: inputRef.value },
  })
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  max-width: 300px;
  margin: 0.5rem 0;
}
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>
