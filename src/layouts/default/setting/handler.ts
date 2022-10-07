import { HandlerEnum } from './enum';
import { updateHeaderBgColor, updateSidebarBgColor } from '/@/logics/theme/updateBackground';
import { updateColorWeak } from '/@/logics/theme/updateColorWeak';
import { updateGrayMode } from '/@/logics/theme/updateGrayMode';

import { useAppStore } from '/@/store/modules/app';
import { ProjectConfig } from '/#/config';
import { changeTheme } from '/@/logics/theme';
import { updateDarkTheme } from '/@/logics/theme/dark';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';

export function baseHandler(event: HandlerEnum, value: any) {
  const appStore = useAppStore();
  const config = handler(event, value);
  appStore.setProjectConfig(config);
  if (event === HandlerEnum.CHANGE_THEME) {
    updateHeaderBgColor();
    updateSidebarBgColor();
  }
}

export function handler(event: HandlerEnum, value: any): DeepPartial<ProjectConfig> {
  const { getThemeColor, getDarkMode } = useRootSetting();
  switch (event) {
    case HandlerEnum.CHANGE_THEME_COLOR:
      if (getThemeColor.value === value) {
        return {};
      }
      changeTheme(value);

      return { themeColor: value };

    case HandlerEnum.CHANGE_THEME:
      if (getDarkMode.value === value) {
        return {};
      }
      updateDarkTheme(value);

      return {};

    case HandlerEnum.MENU_HAS_DRAG:
      return { menuSetting: { canDrag: value } };

    case HandlerEnum.MENU_ACCORDION:
      return { menuSetting: { accordion: value } };

    case HandlerEnum.MENU_TOP_ALIGN:
      return { menuSetting: { topMenuAlign: value } };

    case HandlerEnum.MENU_COLLAPSED:
      return { menuSetting: { collapsed: value } };

    case HandlerEnum.MENU_WIDTH:
      return { menuSetting: { menuWidth: value } };

    case HandlerEnum.MENU_COLLAPSED_SHOW_TITLE:
      return { menuSetting: { collapsedShowTitle: value } };

    case HandlerEnum.MENU_THEME:
      updateSidebarBgColor(value);
      return { menuSetting: { bgColor: value } };

    // ============root==================

    case HandlerEnum.CONTENT_MODE:
      return { contentMode: value };

    case HandlerEnum.SHOW_BREADCRUMB:
      return { showBreadCrumb: value };

    case HandlerEnum.SHOW_BREADCRUMB_ICON:
      return { showBreadCrumbIcon: value };

    case HandlerEnum.GRAY_MODE:
      updateGrayMode(value);
      return { grayMode: value };

    case HandlerEnum.SHOW_FOOTER:
      return { showFooter: value };

    case HandlerEnum.COLOR_WEAK:
      updateColorWeak(value);
      return { colorWeak: value };

    case HandlerEnum.SHOW_LOGO:
      return { showLogo: value };

    // ============header==================
    case HandlerEnum.HEADER_THEME:
      updateHeaderBgColor(value);
      return { headerSetting: { bgColor: value } };

    default:
      return {};
  }
}
