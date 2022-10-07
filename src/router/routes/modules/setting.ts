import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const setting: AppRouteModule = {
  path: '/setting',
  name: 'Setting',
  component: LAYOUT,
  redirect: '/setting/license',
  meta: {
    orderNo: 20,
    icon: 'ion:settings-outline',
    title: t('routes.setting.setting'),
  },
  children: [
    {
      path: 'license',
      name: 'License',
      component: () => import('/@/views/setting/license.vue'),
      meta: {
        title: t('routes.setting.license'),
      },
    },
    {
      path: 'version',
      name: 'Version',
      component: () => import('/@/views/setting/version.vue'),
      meta: {
        title: t('routes.setting.version'),
      },
    },
  ],
};

export default setting;
