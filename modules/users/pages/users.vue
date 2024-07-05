<template>
  <div class="container mx-auto">
    <h1 class="text-5xl mb-5">Users</h1>
    <p class="mb-5">This page is for managing users</p>
    <UsersTable />
  </div>
</template>

<script lang="ts" setup>
import { useUsersStore } from '@/modules/users/store/store';
import { useUsers } from '@/modules/users/composables/useUsers';
import UsersTable from '@/modules//users/components/UsersTable.vue';

const { fetch, users } = useUsers();
await fetch();

const userStore = useUsersStore();
userStore.$patch({ users });
</script>
