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

<script setup lang="ts">
const obj: any = {
  fruit: '香蕉',
}
const value = new Proxy(obj, {
  get(target, prop, receiver) {
    console.log('取得' + target[prop])
    return target[prop]
  },
  set(target, prop, newValue, receiver) {
    console.log(target[prop] + '變成了' + newValue)
    target[prop] = newValue
    return true
  },
})
value.fruit = '鳳梨'
const newValue = { ...value }
console.log(newValue)
console.log(value)
</script>

<style></style>
