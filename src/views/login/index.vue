<template>
  <div class="login-container">
    <Logo />
    <el-row :gutter="20" justify="center">
      <el-col :span="12" :xs="0" :sm="12" :md="12" />
      <el-col :span="12" :xs="24" :sm="12" :md="12">
        <Form :formValue="form" :RULE="RULE" @onSubmit="handleLogin">
          <template #body="{ form }">
            <el-form-item label="帳號" prop="email">
              <el-input :prefix-icon="User" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="密碼" prop="password">
              <el-input
                type="password"
                :prefix-icon="Lock"
                v-model="form.password"
                show-password
              ></el-input>
            </el-form-item>
          </template>
          <template #footer="{ handleSubmit, isLoading }">
            <el-button
              :loading="isLoading"
              type="primary"
              size="default"
              @click="handleSubmit"
            >
              確認
            </el-button>
          </template>
        </Form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { RULE } from './config'
import Form from '@/components/Form/index.vue'
const userStore = useUserStore()
let router = useRouter()
let form = { email: 'normal01@gmail.com', password: 'g111111' }

const handleLogin = async ({
  form,
}: {
  form: { email: string; password: string }
}) => {
  const result = await userStore.reqLogin(form)

  ElNotification({
    type: 'success',
    message: `登入成功(${result})`,
  })

  if (userStore.role === 'supplier') {
    router.push('/supplier')
  } else {
    router.push({ path: '/' })
  }
}
</script>

<style scoped lang="scss">
.login-container {
  padding: 1rem;
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/login_background.png') no-repeat;
  background-color: $theme-color;
  background-size: contain;

  .el-form :deep {
    padding: 1rem;
    margin: 0 auto;
    max-width: 480px;
    width: 100%;
    position: relative;
    top: 30vh;
    border-radius: 0.5rem;
    background: rgba(#4db3b3, 0.7);

    .el-form-item {
      justify-self: center;
      width: 100%;
      .el-form-item__content {
        justify-content: center;
      }
      .el-form-item__label {
        padding: 0;
        font-weight: 700;
        font-size: 1rem;
        color: white;
      }
      .el-form-item__error {
        font-weight: 700;
        color: rgb(255, 0, 0);
      }
    }
    button {
      width: 100%;
      background: #00aeae;
      &:hover {
        background: #08c5c5;
      }
    }
  }
}
</style>
