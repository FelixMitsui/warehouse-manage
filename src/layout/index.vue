<template>
  <div class="layout_container">
    <!-- 側欄 -->
    <div
      class="layout_slider"
      :class="{ fold: layOutSetting.fold ? true : false }"
    >
      <h1>
        <img
          style="height: 44px; object-fit: contain"
          src="../assets/images/fotor-2023120703748.png"
          alt=""
        />
        倉儲管理
      </h1>
      <el-scrollbar class="scrollbar">
        <!--選單-->
        <el-menu
          :default-active="$route.path"
          background-color="fff6e7"
          text-color="black"
          active-text-color="#FF8000"
          :router="true"
          :collapse="layOutSetting.fold ? true : false"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 主要區域 -->
    <div
      class="layout_main"
      :class="{ fold: layOutSetting.fold ? true : false }"
    >
      <Header></Header>
      <main>
        <Main></Main>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/layout/Header/index.vue'
import Menu from '@/layout/Menu/index.vue'
import Main from '@/layout/Main/index.vue'
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
import { debounce } from 'lodash'
let userStore = useUserStore()
let layOutSetting = useLayOutSettingStore()
let $route = useRoute()

onMounted(async () => {
  if (!userStore.email) {
    await userStore.reqAuth()
  }
})
const handleResize = () => {
  layOutSetting.fold = window.innerWidth < 960
}
onMounted(() => {
  const debouncedHandleResize = debounce(handleResize, 300)
  window.addEventListener('resize', debouncedHandleResize)

  handleResize()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<script lang="ts">
export default {
  name: 'Layout',
}
</script>
<style scoped lang="scss">
.layout_container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  .layout_slider {
    color: black;
    height: 100vh;
    width: $base-menu-width;
    min-width: $base-menu-fixed-width;
    background: $theme-color;
    box-shadow: 1px 1px 5px rgb(66, 66, 66);

    h1 {
      display: flex;
      flex-direction: column;
      font-weight: 800;
    }
    &.fold {
      min-width: $base-menu-fixed-width;
      width: $base-menu-min-width;
      h1 {
        display: none;
      }
    }
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
        width: 100%;
      }
    }
  }
  .layout_main {
    max-width: 1200px;
    width: calc(100% - $base-menu-width);
    padding: 1rem;
    overflow-y: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
    }
  }

  @media screen and (min-width: 960px) {
    .layout_slider {
      width: $base-menu-width;

      h1 {
        padding: 0.5rem;
        display: flex;
        text-align: center;

        img {
          margin-bottom: 0.5rem;
        }
      }
    }
  }
}
</style>

<script setup lang="ts"></script>

<style></style>
