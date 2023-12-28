<template>
  <div class="header">
    <div class="header_left">
      <Breadcrumb />
    </div>
    <h1 :class="{ show: useLayOutSetting.fold ? true : false }">
      <img
        style="height: 44px; margin: 0 0.2rem; object-fit: contain"
        src="../../assets/images/fotor-2023120703748.png"
        alt=""
      />
      倉儲管理
    </h1>
    <div class="header_right">
      <Setting />
    </div>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import Breadcrumb from './Breadcrumb/index.vue'
import Setting from './Setting/index.vue'

let useLayOutSetting = useLayOutSettingStore()
</script>
<style scoped lang="scss">
.header {
  width: 100%;
  display: flex;
  height: auto;
  flex-direction: column;
  border-bottom: 1px solid black;
  .header_center {
    display: none;
    font-weight: 800;
  }

  .header_left {
    display: flex;
  }
  h1 {
    font-weight: 800;
    &.show {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      align-self: center;
    }
  }
  .header_right {
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: end;
  }

  @media screen and (min-width: 960px) {
    flex-direction: row;
    justify-content: space-between;

    h1 {
      display: none;
    }
  }
}
</style>
