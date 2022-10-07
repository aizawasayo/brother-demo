import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

export const home: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'ant-design:home-outlined',
    title: t('routes.basic.home'),
    orderNo: 10,
  },
  children: [
    {
      path: 'index',
      name: 'HomePage',
      component: () => import('/@/views/home.vue'),
      meta: {
        title: t('routes.basic.home'),
        icon: 'ant-design:home-outlined',
        hideMenu: true,
        hideBreadcrumb: true,
      },
    },
  ],
};
export default home;
