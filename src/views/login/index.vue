<template>
  <div class="login-container">
    <Logo />
    <el-row :gutter="20" justify="center">
      <el-col :span="12" :xs="0" :sm="12" :md="12" />
      <el-col :span="12" :xs="24" :sm="12" :md="12">
        <el-form
          label-width="80px"
          class="login-form"
          :model="loginForm"
          :rules="RULE"
        >
          <el-form-item label="帳號" prop="email" ref="formValidateRef">
            <el-input :prefix-icon="User" v-model="loginForm.email"></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loadingRef"
              type="primary"
              size="default"
              @click="login"
            >
              確認
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { RULE } from './constants'
const userStore = useUserStore()
let $router = useRouter()
const formValidateRef = ref()
let loadingRef = ref(false)
let loginForm = reactive({ email: 'normal01@gmail.com', password: 'g111111' })

const login = async () => {
  await formValidateRef.value.validate()
  loadingRef.value = true
  try {
    const result = await userStore.reqLogin(loginForm)

    ElNotification({
      type: 'success',
      message: `登入成功(${result})`,
    })

    if (userStore.role === 'supplier') {
      $router.push('/supplier')
    } else {
      $router.push({ path: '/' })
    }
  } catch (err) {
    console.log(err)
  } finally {
    loadingRef.value = false
  }
}
</script>

<style lang="scss">
.login-container {
  padding: 1rem;
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/login_background.png') no-repeat;
  background-color: $theme-color;
  background-size: contain;
}

.login-form {
  padding: 1rem;
  margin: 0 auto;
  max-width: 480px;
  width: 100%;
  position: relative;
  top: 30vh;
  border-radius: 0.5rem;
  background: rgba(#4db3b3, 0.7);

  button {
    width: 100%;
    background: #00AEAE;
    &:hover {
      background:#08c5c5;
    }
  }
  .el-form-item__label {
    justify-content: center;
    padding: 0;
    font-weight: 800;
    font-size: 1rem;
    color: white;
  }
}
</style>
