<template>
  <!-- 顶部左侧静态 -->
  <div class="collapse">
    <el-icon @click="changeIcon">
      <component :is="layOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
  </div>

  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包动态展示路由名字与标题 -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 图标 -->
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 面包屑展示匹配路由的标题 -->
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import useLayOutSettingStore from '@/store/modules/setting'
//获取layout配置相关的仓库
let layOutSettingStore = useLayOutSettingStore()
//获取路由对象
let $route = useRoute()
//点击图标的方法
const changeIcon = () => {
  //图标进行切换
  layOutSettingStore.fold = !layOutSettingStore.fold
}
</script>

<style scoped lang="scss">
.collapse {
  display: none;

  @media screen and (min-width: 960px) {
    font-size: 1.2rem;
    margin-right: 0.5rem;
    display: block;
  }
}
</style>
