import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { mainOutRoutes } from './mainOut';
import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';

const modules: moduleType = import.meta.glob('./modules/**/*.ts', { eager: true });
const asyncModules: moduleType = import.meta.glob('./asyncModules/**/*.ts', { eager: true });

const routeModuleList: AppRouteModule[] = [];
const asyncRouteModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

Object.keys(asyncModules).forEach((key) => {
  const mod = asyncModules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  asyncRouteModuleList.push(...modList);
});

export const routes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...asyncRouteModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  ...routes,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
