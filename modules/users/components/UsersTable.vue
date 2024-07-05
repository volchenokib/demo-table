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
  millisecondsToDatetime,
  toDatetimeLocalString,
  datetimeLocalToSeconds,
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

const formattedUserList = ref([]);

// format date to readable format for the form
watchEffect(() => {
  formattedUserList.value = userStore.users.map((user) => ({
    ...user,
    lastVisitedAt: millisecondsToDatetime(user.lastVisitedAt, 'datetime'),
  }));
});

// format date to be saved in the store
const rowSelected = (rowData: User) => {
  if (!rowData) return (currentUser.value = defaultUser);

  currentUser.value = {
    ...rowData,
    lastVisitedAt: toDatetimeLocalString(rowData.lastVisitedAt),
  };
};

function saveUserHandler(updatedUser: User) {
  const formattedUser = {
    ...updatedUser,
    lastVisitedAt: datetimeLocalToSeconds(updatedUser.lastVisitedAt),
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
</script>
