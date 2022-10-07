import { defineComponent, unref } from 'vue';
import { Divider } from 'ant-design-vue';
import {
  ThemeColorPicker,
  SettingFooter,
  SwitchItem,
  SelectItem,
  InputNumberItem,
} from './components';

import BasicDrawer from '/@/components/Drawer/src/BasicDrawer.vue';

import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { useAppInject } from '/@/hooks/web/useAppInject';
import { useI18n } from '/@/hooks/web/useI18n';

import { HandlerEnum, contentModeOptions, topMenuAlignOptions } from './enum';

import {
  HEADER_PRESET_BG_COLOR_LIST,
  SIDE_BAR_BG_COLOR_LIST,
  APP_PRESET_COLOR_LIST,
} from '/@/settings/designSetting';

const { t } = useI18n();

export default defineComponent({
  name: 'SettingDrawer',
  setup(_, { attrs }) {
    const { getContentMode, getColorWeak, getGrayMode, getThemeColor, getShowBreadCrumb } =
      useRootSetting();
    const { getIsMobile } = useAppInject();
    const { getCanDrag, getTopMenuAlign, getMenuWidth, getMenuBgColor } = useMenuSetting();

    const { getHeaderBgColor } = useHeaderSetting();

    function renderHeaderTheme() {
      return (
        <ThemeColorPicker
          colorList={HEADER_PRESET_BG_COLOR_LIST}
          def={unref(getHeaderBgColor)}
          event={HandlerEnum.HEADER_THEME}
        />
      );
    }

    function renderSiderTheme() {
      return (
        <ThemeColorPicker
          colorList={SIDE_BAR_BG_COLOR_LIST}
          def={unref(getMenuBgColor)}
          event={HandlerEnum.MENU_THEME}
        />
      );
    }

    function renderMainTheme() {
      return (
        <ThemeColorPicker
          colorList={APP_PRESET_COLOR_LIST}
          def={unref(getThemeColor)}
          event={HandlerEnum.CHANGE_THEME_COLOR}
        />
      );
    }

    /**
     * @description:
     */
    function renderFeatures() {
      return (
        <>
          <SwitchItem
            title={t('layout.setting.menuDrag')}
            event={HandlerEnum.MENU_HAS_DRAG}
            def={unref(getCanDrag)}
            disabled={!unref(getIsMobile)}
          />

          <SelectItem
            title={t('layout.setting.topMenuLayout')}
            event={HandlerEnum.MENU_TOP_ALIGN}
            def={unref(getTopMenuAlign)}
            options={topMenuAlignOptions}
            disabled={unref(getIsMobile)}
          />
          <SelectItem
            title={t('layout.setting.contentMode')}
            event={HandlerEnum.CONTENT_MODE}
            def={unref(getContentMode)}
            options={contentModeOptions}
          />

          <InputNumberItem
            title={t('layout.setting.expandedMenuWidth')}
            max={600}
            min={100}
            step={10}
            event={HandlerEnum.MENU_WIDTH}
            disabled={!unref(getIsMobile)}
            defaultValue={unref(getMenuWidth)}
            formatter={(value: string) => `${parseInt(value)}px`}
          />
        </>
      );
    }

    function renderContent() {
      return (
        <>
          <SwitchItem
            title={t('layout.setting.breadcrumb')}
            event={HandlerEnum.SHOW_BREADCRUMB}
            def={unref(getShowBreadCrumb)}
            disabled={unref(getIsMobile)}
          />

          <SwitchItem
            title={t('layout.setting.grayMode')}
            event={HandlerEnum.GRAY_MODE}
            def={unref(getGrayMode)}
          />

          <SwitchItem
            title={t('layout.setting.colorWeak')}
            event={HandlerEnum.COLOR_WEAK}
            def={unref(getColorWeak)}
          />
        </>
      );
    }

    return () => (
      <BasicDrawer
        {...attrs}
        title={t('layout.setting.drawerTitle')}
        width={330}
        wrapClassName="setting-drawer"
      >
        <Divider>{() => t('layout.setting.sysTheme')}</Divider>
        {renderMainTheme()}
        <Divider>{() => t('layout.setting.headerTheme')}</Divider>
        {renderHeaderTheme()}
        <Divider>{() => t('layout.setting.sidebarTheme')}</Divider>
        {renderSiderTheme()}
        <Divider>{() => t('layout.setting.interfaceFunction')}</Divider>
        {renderFeatures()}
        <Divider>{() => t('layout.setting.interfaceDisplay')}</Divider>
        {renderContent()}
        <Divider />
        <SettingFooter />
      </BasicDrawer>
    );
  },
});
