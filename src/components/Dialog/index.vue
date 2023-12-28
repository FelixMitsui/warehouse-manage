<template>
  <el-button
    color="#00AEAE"
    :disabled="!auth"
    :size="size || 'default'"
    @click="dialogFormVisible = true"
  >
    {{ name }}
  </el-button>

  <el-dialog
    :center="true"
    :modal-append-to-body="false"
    :append-to-body="true"
    v-model="dialogFormVisible"
    :title="title"
  >
    <slot :handleClose="handleClose"></slot>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
defineProps(['name', 'title', 'size', 'auth'])
const dialogFormVisible = ref(false)

const handleClose = () => {
  dialogFormVisible.value = false
}
</script>
<style lang="scss">
.el-dialog {
  --el-dialog-width: 90%;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}

@media screen and (min-width: 768px) {
  .el-dialog {
    width: 70%;
  }
}

@media screen and (min-width: 960px) {
  .el-dialog {
    width: 60%;
  }
}

@media screen and (min-width: 1152px) {
  .el-dialog {
    width: 50%;
  }
}
</style>
