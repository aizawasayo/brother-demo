import type { MenuSetting } from '/#/config';

import { computed, unref } from 'vue';

import { useAppStore } from '/@/store/modules/app';

import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '/@/enums/appEnum';

export function useMenuSetting() {
  const appStore = useAppStore();

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth);

  const getMenuTheme = computed(() => appStore.getMenuSetting.theme);

  const getMenuBgColor = computed(() => appStore.getMenuSetting.bgColor);

  const getCanDrag = computed(() => appStore.getMenuSetting.canDrag);

  const getAccordion = computed(() => appStore.getMenuSetting.accordion);

  const getTopMenuAlign = computed(() => appStore.getMenuSetting.topMenuAlign);

  const getCollapsedShowTitle = computed(() => appStore.getMenuSetting.collapsedShowTitle);

  const getMiniWidthNumber = computed(() => {
    const { collapsedShowTitle } = appStore.getMenuSetting;
    return collapsedShowTitle ? SIDE_BAR_SHOW_TIT_MINI_WIDTH : SIDE_BAR_MINI_WIDTH;
  });

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting });
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
  }
  return {
    setMenuSetting,
    toggleCollapsed,
    getCollapsed,
    getMiniWidthNumber,
    getMenuWidth,
    getMenuTheme,
    getCanDrag,
    getCollapsedShowTitle,
    getAccordion,
    getTopMenuAlign,
    getMenuBgColor,
  };
}
