<template>
  <el-form
    :inline="true"
    :model="form"
    ref="validRef"
    :rules="RULE"
    label-width="80px"
  >
    <slot name="body" :form="form"></slot>
    <div class="footer">
      <slot
        name="footer"
        :isLoading="isLoadingRef"
        :handleSubmit="handleSubmit"
      ></slot>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref, Ref, reactive } from 'vue'
import { ElForm } from 'element-plus'

const { formValue, RULE, callback, tableRow } = defineProps([
  'formValue',
  'RULE',
  'callback',
  'tableRow',
])
const emits = defineEmits(['onSubmit'])
const form: any = reactive({ ...formValue })

const validRef: Ref<typeof ElForm | null> = ref(null)

const isLoadingRef = ref(false)

const handleSubmit = async () => {
  isLoadingRef.value = true
  const isValid = await validRef.value?.validate()
  if (!isValid) {
    isLoadingRef.value = false
    return
  }
  emits('onSubmit', { form: { ...form }, tableRow: tableRow && tableRow })
  //if callback exist action parent function prop
  callback && callback()
  validRef.value?.resetFields()
  isLoadingRef.value = false
}
</script>

<style scoped lang="scss">
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
