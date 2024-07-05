<template>
  <div>
    <form>
      <div v-for="(value, key) in filteredFormData" :key="key">
        <label :for="key">{{ formatLabel(key) }}:</label>
        <input
          v-if="key !== 'lastVisitedAt'"
          :id="key"
          v-model="formData[key]"
          :type="getInputType(key, value)"
        />
        <input
          v-else
          id="lastVisitedAt"
          type="datetime-local"
          v-model="formData[key]"
        />
      </div>
      <div class="form-actions">
        <button type="button" @click="deleteData">Delete</button>
        <button type="button" @click="saveData">Save</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, computed, watchEffect } from 'vue';

const props = defineProps<{ data: Record<string, any> }>();
const emit = defineEmits<{
  (e: 'save', updatedData: Record<string, any>): void;
  (e: 'delete', deletedData: Record<string, any>): void;
}>();

const formData = ref<Record<string, any>>({ ...props.data });

watchEffect(() => {
  formData.value = { ...props.data };
});

const filteredFormData = computed(() => {
  const { id, ...rest } = formData.value;
  return rest;
});

const formatLabel = (key: string) => {
  return key
    .replace(/([A-Z])/g, ' $1') // This method replaces each uppercase letter in the string with a space followed by the uppercase letter.
    .replace(/^./, (str) => str.toUpperCase()); // This method replaces the first character of the string with its uppercase version.
};

const getInputType = (key: string, value: any) => {
  if (typeof value === 'number') {
    return 'number';
  }
  if (typeof value === 'string' && key.includes('email')) {
    return 'email';
  }
  return 'text';
};

// Reset the form data to the initial state
function resetFormData() {
  formData.value = Object.keys(formData.value).reduce((acc, key) => {
    acc[key] = typeof formData.value[key] === 'number' ? 0 : '';
    return acc;
  }, {} as Record<string, any>);
}

const saveData = () => {
  emit('save', formData.value);
  resetFormData();
};

const deleteData = () => {
  emit('delete', formData.value);
  resetFormData();
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
}

div {
  margin-bottom: 10px;
}

label {
  margin-right: 10px;
}

input {
  width: 100%;
  box-sizing: border-box;
}

button {
  width: 100px;
  align-self: flex-start;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1em;
}
</style>
