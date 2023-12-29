<template>
  <el-form
    :inline="true"
    :model="form"
    ref="validRef"
    :rules="RULE"
    label-width="80px"
  >
    <slot name="formArea" :form="form"></slot>
    <div class="footer">
      <slot
        name="btnArea"
        :form="form"
        :isLoading="isLoadingRef"
        :validate="validRef?.validate"
        :onLoadStatus="handleLoadStatus"
      ></slot>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { defineProps, ref, Ref, reactive } from 'vue'
import { ElForm } from 'element-plus'

const { formValue, RULE } = defineProps(['formValue', 'RULE'])

const form: any = reactive({ ...formValue })

const validRef: Ref<typeof ElForm | null> = ref(null)

const isLoadingRef = ref(false)

const handleLoadStatus = (bool: boolean) => {
  isLoadingRef.value = bool
}
</script>

<style lang="scss">
.el-form {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .el-form-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 0;
  }
}

.footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 576px) {
  .el-form {
    .el-form-item {
      flex-direction: row;
    }
  }
}
</style>
