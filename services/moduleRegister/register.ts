import { resolve } from 'pathe';
import { NuxtPage } from '@nuxt/schema/dist/index';

export const registerRoutes = (
  routes: Array<Required<Pick<NuxtPage, 'name' | 'path' | 'file'>>>,
  pages: NuxtPage[],
  dirname: string,
) => {
  routes.forEach((route) => {
    pages.push({
      name: route.name,
      path: `${route.path}`,
      file: resolve(dirname, route.file),
    });
  });
};
