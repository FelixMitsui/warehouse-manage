<!-- children.vue -->
<template>
  <slot :letter="letter">{{ '默認內容' }}</slot>
  <div>子組件本身的內容</div>
</template>
<script setup lang="ts">
const letter = '子組件的一封信'
</script>
<style lang=""></style>
