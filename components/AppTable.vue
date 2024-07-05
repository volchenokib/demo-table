<template>
  <div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
          <td>
            <input
              type="checkbox"
              :checked="selectedRow === row"
              @change="selectRow(row)"
            />
          </td>
          <td v-for="(header, index) in headers" :key="index">
            {{ row[header] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watchEffect } from 'vue';

interface TableRow {
  [key: string]: any;
}

const props = defineProps<{ initialData: TableRow[] }>();
const emit = defineEmits<{
  (e: 'rowSelected', selectedRow: TableRow | null): void;
}>();

const tableData = ref<TableRow[]>([...props.initialData]);
const headers = ref<string[]>([]);

watchEffect(() => {
  if (props.initialData.length > 0) {
    headers.value = Object.keys(props.initialData[0]);
  }
  tableData.value = [...props.initialData];
});

const selectedRow = ref<TableRow | null>(null);

const selectRow = (row: TableRow) => {
  if (selectedRow.value === row) {
    selectedRow.value = null;
  } else {
    selectedRow.value = row;
  }
  emit('rowSelected', selectedRow.value);
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

input[type='checkbox'] {
  width: 16px;
  height: 16px;
}
</style>
