<template>
  <div class="logo">
    <svg width="150" height="70" xmlns="http://www.w3.org/2000/svg">
      <rect
        v-for="(item, index) in items"
        :key="index"
        :x="item.x * item.width"
        :y="item.y"
        :width="item.width"
        :height="item.height"
        :fill="item.color"
        stroke="white"
        stroke-width="1"
        :class="{ show: item.color == 'white' }"
      />
    </svg>
  </div>
</template>
<script lang="ts" setup>
const colorCache = new Map()

const shouldColorBeWhite = (x: number, y: number) => {
  const cacheKey = `${x}-${y}`

  if (colorCache.has(cacheKey)) {
    return colorCache.get(cacheKey)
  }

  let color = '#009CAD'

  if (
    (x === 1 && y >= 10 && y <= 50) ||
    (x === 2 && (y === 10 || y === 30)) ||
    (x === 4 && y >= 10 && y <= 50) ||
    (x === 5 && (y === 10 || y === 30 || y === 50)) ||
    (x === 7 && y >= 10 && y <= 50) ||
    (x === 9 && y >= 10 && y <= 50 && y !== 20) ||
    (x === 11 && ((y >= 10 && y <= 20) || (y >= 40 && y <= 50))) ||
    (x === 12 && y === 30) ||
    (x === 13 && ((y >= 10 && y <= 20) || (y >= 40 && y <= 50)))
  ) {
    color = 'white'
  }

  colorCache.set(cacheKey, color)
  return color
}

const createItems = () => {
  const items = []

  for (let i = 0; i < 105; i++) {
    const x = i % 15
    const y = Math.floor(i / 15) * 10
    const color = shouldColorBeWhite(x, y)

    items.push({
      x,
      y,
      color,
      width: 10,
      height: 10,
    })
  }

  return items
}

const items = createItems()
</script>
<style lang="scss"></style>
