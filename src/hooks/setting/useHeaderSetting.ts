import type { HeaderSetting } from '/#/config';

import { computed, unref } from 'vue';

import { useAppStore } from '/@/store/modules/app';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';

export function useHeaderSetting() {
  const appStore = useAppStore();

  const { getShowLogo } = useRootSetting();

  const getHeaderTheme = computed(() => appStore.getHeaderSetting.theme);

  const getHeaderBgColor = computed(() => appStore.getHeaderSetting.bgColor);

  const getShowFullScreen = computed(() => appStore.getHeaderSetting.showFullScreen);

  const getShowNotice = computed(() => appStore.getHeaderSetting.showNotice);

  const getShowHeaderLogo = computed(() => {
    return unref(getShowLogo);
  });

  // Set header configuration
  function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
    appStore.setProjectConfig({ headerSetting });
  }
  return {
    setHeaderSetting,
    getHeaderTheme,
    getShowFullScreen,
    getShowNotice,
    getShowHeaderLogo,
    getHeaderBgColor,
  };
}
