<template>
  <!-- collapse button -->
  <div class="collapse">
    <el-icon @click="changeIcon">
      <component :is="layOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
  </div>
  <!-- breadcrumb -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import useLayOutSettingStore from '@/store/modules/setting'

let layOutSettingStore = useLayOutSettingStore()

let route = useRoute()

const changeIcon = () => {
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
