<template>
  <el-table :data="tableData" @selection-change="handleSelectionChange">
    <el-table-column v-if="isSelect" type="selection" width="55" />
    <el-table-column
      v-for="(table, key) in tableColItems"
      :key="key"
      :fixed="table.fixed"
      :prop="table.prop"
      :label="table.label"
      :type="table.type"
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
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- checkbox -->
          <div v-else-if="table.type === 'checkbox'" class="checkbox-container">
            <el-checkbox
              v-for="(item, key) in table.checkboxList"
              :key="key"
              :label="item.label"
              @change="
                () => {
                  scope.row[table.prop] ^= item.value as number
                }
              "
              :checked="!!(scope.row[table.prop] & (item.value as number))"
              size="large"
            />
          </div>
          <!-- input -->
          <el-input
            v-else
            v-model="scope.row[table.prop]"
            :value="scope.row[table.prop]"
          />
        </template>
        <!-- default -->
        <template v-else>
          <template
            v-if="
              scope.row[table.prop] !== undefined &&
              scope.row[table.prop] !== null
            "
          >
            <template v-if="table.transform">
              {{ table.transform[scope.row[table.prop]] }}
            </template>
            <template v-else-if="table.method">
              {{ table.method(scope.row[table.prop]) }}
            </template>
            <template v-else>
              {{ scope.row[table.prop] }}
            </template>
          </template>
          <!-- if there is a default value or value is nested properties -->
          <template v-else>
            <template v-if="table.default">
              {{ table.default }}
            </template>
            <template v-else>
              {{
                scope.row[table.prop.split('.')[0]][table.prop.split('.')[1]]
              }}
            </template>
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
        <slot
          :tableRow="scope.row"
          :index="scope.$index"
          :editRow="editRowRef"
          :onEdit="handleEdit"
        ></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts" generic="T extends Object">
import { ref } from 'vue'

interface TableColItem {
  prop: string
  label: string
  fixed?: string
  type?: string
  width?: string
  isEdit?: boolean
  selectList?: Array<{ label: string; value: string | number }>
  checkboxList?: Array<{ label: string; value: string | number }>
  transform?: string[]
  method?: (value: any) => any
  default?: string
}
defineSlots<{
  default({
    tableRow,
    index,
    editRow,
    onEdit,
  }: {
    tableRow: T
    index: number
    editRow: number | string | null
    onEdit: (id?: number | string | null) => void
  }): any
}>()
defineProps<{
  tableData: T[]
  tableColItems: TableColItem[]
  settingLabel?: string
  settingWidth?: string
  isSelect?: boolean
}>()
const selectedTableRowRef = ref<any[]>([])

defineExpose({ selectedTableRowRef })
const editRowRef = ref<number | string | null>(null)

const handleEdit = (id?: number | string | null) => {
  if (id) {
    editRowRef.value = id
  } else {
    editRowRef.value = null
  }
}
const handleSelectionChange = (value: T[]) => {
  selectedTableRowRef.value = value
}
</script>

<style scoped lang="scss">
.el-table :deep {
  .el-table-column {
    display: flex;
   
    justify-content: center;
  }
   .el-table__cell {
    padding: 0.2rem 0.8rem;
   }
  .cell {
    display: flex;
    justify-content: center;
  }
}

.checkbox-container {
  display: flex;
  flex-direction: column;
}
</style>
