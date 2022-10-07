<template>
  <a-layout-Header :class="getHeaderClass">
    <!-- left start -->
    <div :class="`${prefixCls}-left`">
      <!-- logo -->
      <AppLogo
        v-if="!getIsMobile && getShowHeaderLogo"
        :class="`${prefixCls}-logo`"
        :theme="getHeaderTheme"
        :style="getLogoWidth"
      />
      <LayoutTrigger v-if="getIsMobile" :theme="getHeaderTheme" :sider="false" />
    </div>
    <!-- left end -->

    <!-- menu start -->
    <div :class="`${prefixCls}-menu`" v-if="!getIsMobile">
      <LayoutMenu :theme="getHeaderTheme" />
    </div>
    <!-- menu-end -->

    <!-- action  -->
    <div :class="`${prefixCls}-action`">
      <Notify v-if="getShowNotice" :class="`${prefixCls}-action__item notify-item`" />

      <FullScreen v-if="getShowFullScreen" :class="`${prefixCls}-action__item fullscreen-item`" />

      <AppLocalePicker
        v-if="getShowLocalePicker"
        :reload="true"
        :showText="false"
        :class="`${prefixCls}-action__item`"
      />
      <AppDarkModeToggle class="mx-auto" />

      <UserDropDown :theme="getHeaderTheme" />

      <SettingDrawer v-if="getShowSetting" :class="`${prefixCls}-action__item`" />
    </div>
  </a-layout-Header>
</template>
<script lang="ts">
  import { defineComponent, unref, computed } from 'vue';

  import { propTypes } from '/@/utils/propTypes';

  import LayoutMenu from '../menu.vue';
  import LayoutTrigger from '../trigger.vue';

  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';

  import { MenuModeEnum } from '/@/enums/menuEnum';
  import { SettingButtonPositionEnum } from '/@/enums/appEnum';

  import { UserDropDown, FullScreen, Notify } from './components';
  import { useAppInject } from '/@/hooks/web/useAppInject';
  import { useDesign } from '/@/hooks/web/useDesign';

  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { useLocale } from '/@/locales/useLocale';

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      LayoutTrigger,
      LayoutMenu,
      UserDropDown,
      FullScreen,
      Notify,
      SettingDrawer: createAsyncComponent(() => import('/@/layouts/default/setting/index.vue'), {
        loading: true,
      }),
    },
    props: {
      fixed: propTypes.bool,
    },
    setup(props) {
      const { prefixCls } = useDesign('layout-header');
      const { getMenuWidth } = useMenuSetting();
      const { getShowSettingButton, getSettingButtonPosition } = useRootSetting();

      const { getHeaderTheme, getShowFullScreen, getShowNotice, getShowHeaderLogo } =
        useHeaderSetting();

      const { getShowLocalePicker } = useLocale();

      const { getIsMobile } = useAppInject();

      const getHeaderClass = computed(() => {
        const theme = unref(getHeaderTheme);
        return [
          prefixCls,
          {
            [`${prefixCls}--fixed`]: props.fixed,
            [`${prefixCls}--mobile`]: unref(getIsMobile),
            [`${prefixCls}--${theme}`]: theme,
          },
        ];
      });

      const getShowSetting = computed(() => {
        if (!unref(getShowSettingButton)) {
          return false;
        }
        const settingButtonPosition = unref(getSettingButtonPosition);

        if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
          return true;
        }
        return settingButtonPosition === SettingButtonPositionEnum.HEADER;
      });

      const getLogoWidth = computed(() => {
        if (unref(getIsMobile)) {
          return {};
        }
        const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth);
        return { width: `${width}px` };
      });

      return {
        prefixCls,
        getHeaderClass,
        getShowHeaderLogo,
        getHeaderTheme,
        getIsMobile,
        MenuModeEnum,
        getShowLocalePicker,
        getShowFullScreen,
        getShowNotice,
        getLogoWidth,
        getShowSettingButton,
        getShowSetting,
      };
    },
  });
</script>
<style lang="less">
  @import './index.less';
</style>
