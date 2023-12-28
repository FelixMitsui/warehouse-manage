<template>
  <div class="mt-4">
    <el-input
      v-model="inputRef"
      :placeholder="placeholder"
      class="input-with-select"
    >
      <template #prepend>
        <el-select v-model="selectRef" placeholder="分類" style="width: 115px">
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

<style lang="scss">
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
  .el-input {
    width: 115px;
  }
}
</style>
