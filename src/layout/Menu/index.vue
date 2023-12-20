<template>
  <template v-for="item in menuList" :key="item.path">
    <!--没有子路由-->
    <template
      v-if="
        (!item.children || item.children[0].name == item.name) &&
        !item.meta.hidden
      "
    >
      <el-menu-item :index="item.children ? item.children[0].path : item.path">
        <el-icon>
          <component
            :is="item.children ? item.children[0].meta.icon : item.meta.icon"
          ></component>
        </el-icon>
        <span>
          {{ item.children ? item.children[0].meta.title : item.meta.title }}
        </span>
      </el-menu-item>
    </template>
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1 && !item.meta.hidden"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
defineProps(['menuList'])
</script>
<script lang="ts">
export default {
  name: 'Menu',
}
</script>

<style scoped lang="scss"></style>
