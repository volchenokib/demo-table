import { defineStore } from 'pinia';
import type { User } from '@/modules/users/support/types';

export const useUsersStore = defineStore({
  id: 'users-store',

  state: () => ({
    users: [] as User[],
  }),

  getters: {
    getUserById: (state) => (id: number) => {
      return state.users.find((user) => user.id === id);
    },
  },

  actions: {
    createUser(user: User) {
      // create a new id for the user based on the current length of the users array
      user.id = this.users.length + 1;
      this.users.unshift(user);
    },
    updateUser(user: User, idx: number) {
      this.users[idx] = user;
    },
    deleteUser(id: number) {
      this.users = this.users.filter((user) => user.id !== id);
    },
  },
});
