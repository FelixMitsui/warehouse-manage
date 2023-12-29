<!-- parent.vue -->
<template>
  <Children>
    <template v-slot="scoped">
      <div>
        {{ '父組件取得了' + scoped.letter }}
        <br />
      </div>
    </template>
  </Children>
</template>

<script setup lang="ts"></script>

<style></style>
