export const routesObj = {
  index: {
    name: 'users',
    path: '/users',
    file: './pages/users.vue',
    params: undefined,
  },
  userPage: {
    name: 'user',
    path: '/users/:id',
    file: './pages/[id].vue',
    params: { id: 'id' },
  },
} as const;

export const routes = Object.values(routesObj);
