<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      v-for="(table, key) in tableColItems"
      :key="key"
      :fixed="table.fixed"
      :prop="table.prop"
      :label="table.label"
      :width="table.width"
      align="center"
    >
      <template #default="scope">
        <template v-if="table.isEdit && editRowRef == scope.row['id']">
          <!-- select -->
          <el-select
            v-if="table.type === 'select'"
            v-model="scope.row[table.prop]"
          >
            <el-option
              v-for="item in table.selectList"
              :key="item"
              :label="item.name"
              :value="item.category"
            />
          </el-select>
          <!-- checkbox -->
          <div v-else-if="table.type === 'checkbox'" class="checkbox-container">
            <el-checkbox
              v-for="(item, key) in table.checkboxList"
              :key="key"
              :label="item.name"
              @change="
                () => {
                  scope.row[table.prop] ^= item.value
                }
              "
              :checked="!!(scope.row[table.prop] & item.value)"
              size="large"
            />
          </div>
          <!-- input -->
          <el-input
            v-else
            v-model="tableData[table.prop]"
            :value="scope.row[table.prop]"
          />
        </template>
        <!-- default -->
        <template v-else>
          <template v-if="scope.row[table.prop] !== undefined">
            {{ render(scope.row[table.prop], table.prop) }}
          </template>
          <template v-else>
            {{ scope.row[table.prop.split('.')[0]][table.prop.split('.')[1]] }}
          </template>
        </template>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      :label="settingLabel"
      :width="settingWidth"
      align="center"
    >
      <template #default="scope">
        <slot :row="scope.row" :index="scope.$index"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

defineProps([
  'tableData',
  'tableColItems',
  'settingLabel',
  'settingWidth',
  'editRowRef',
])

const render = (value: number | string | any[], propName: any) => {
  if (value === undefined) {
    return value
  }
  if (Array.isArray(value)) {
    if (propName === 'products') {
      const count = value.reduce((total, current) => total + current.count, 0)
      return count
    }
    return value.length === 0 ? '無' : value
  } else if (propName === 'status') {
    return value === 0 ? '未完成' : '已完成'
  } else if (propName === 'create_at' || propName === 'shipping_date') {
    const date = new Date(value)
    return date.toLocaleDateString()
  } else {
    return value
  }
}
</script>

<style lang="scss">
.el-table {
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
}
.el-table-column {
  display: flex;
  justify-content: center;
}
.checkbox-container {
  display: flex;
  flex-direction: column;
}
</style>
