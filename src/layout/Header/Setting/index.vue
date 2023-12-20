<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="updateRefresh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="fullScreen"
  ></el-button>
  <!-- User dropdown -->
  <el-dropdown>
    <span class="el-dropdown-link">
      HI, {{ userStore.name }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">登出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
let layoutSettingStore = useLayOutSettingStore()
let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()

const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}

const fullScreen = () => {
  let full = document.fullscreenElement

  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

const logout = async () => {
  await userStore.reqLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<script lang="ts">
export default {
  name: 'Setting',
}
</script>
<style scoped>
.el-dropdown {
  margin-left: 0.5rem;
}
</style>
