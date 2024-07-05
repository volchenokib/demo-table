<template>
  <div class="container mx-auto">
    <AppForm
      :data="currentUser"
      @save="saveUserHandler"
      @delete="deleteUserHandler"
    />

    <AppTable
      v-if="formattedUserList.length"
      :initialData="formattedUserList"
      @rowSelected="rowSelected"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { useUsersStore } from '@/modules/users/store/store';
import AppTable from '@/components/AppTable.vue';
import AppForm from '@/components/AppForm.vue';
import type { User } from '@/modules/users/support/types';
import {
  datetimeLocalToMilliseconds,
  millisecondsToDatetimeLocal,
} from '@/modules/users/support/helpers';

const userStore = useUsersStore();

const defaultUser = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  lastVisitedAt: 0,
};

const currentUser = ref(defaultUser);

function numberToDateTime(timestamp: number) {
  return new Date(timestamp * 1000).toISOString().slice(0, 16);
}

const formattedUserList = ref([]);

watchEffect(() => {
  formattedUserList.value = userStore.users.map((user) => ({
    ...user,
    lastVisitedAt: numberToDateTime(user.lastVisitedAt),
  }));
});

const rowSelected = (rowData: User) => {
  if (!rowData) return (currentUser.value = defaultUser);

  currentUser.value = {
    ...rowData,
    lastVisitedAt: millisecondsToDatetimeLocal(rowData.lastVisitedAt),
  };
};

function saveUserHandler(updatedUser: User) {
  const formattedUser = {
    ...updatedUser,
    lastVisitedAt: datetimeLocalToMilliseconds(updatedUser.lastVisitedAt),
  };

  const index = userStore.users.findIndex(
    (user) => user.id === formattedUser.id,
  );
  if (index > -1) {
    userStore.updateUser(formattedUser, index);
  } else {
    userStore.createUser(formattedUser);
  }
}

function deleteUserHandler(user: User) {
  userStore.deleteUser(user.id);
}

watchEffect(() => {
  formattedUserList.value = userStore.users.map((user) => ({
    ...user,
    lastVisitedAt: numberToDateTime(user.lastVisitedAt),
  }));
});
</script>
