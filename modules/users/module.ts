import { defineNuxtModule, addServerHandler, createResolver } from '@nuxt/kit';
// import { resolve, join } from 'pathe'
import type { Nuxt } from '@nuxt/schema';
import { registerRoutes } from '../../services/moduleRegister/register';
import { routes } from './routes';
export default defineNuxtModule({
  meta: {
    name: 'blog-module',
    configKey: 'user-module',
  },
  setup(_: any, nuxt: Nuxt) {
    // Register pages
    nuxt.hook('pages:extend', (pages) => {
      registerRoutes(routes, pages, __dirname);
    });

    // Register server handlers
    // nuxt.hook('nitro:config', (nitroConfig) => {
    //   nitroConfig.handlers?.push({
    //     method: 'get',
    //     route: '/api/users',
    //     handler: '~/server/api/users.ts',
    //   });
    // });

    // const resolver = createResolver(import.meta.url);

    // addServerHandler({
    //   route: '/api/users',
    //   handler: resolver.resolve('~/server/api/users.ts'),
    // });
  },
});
