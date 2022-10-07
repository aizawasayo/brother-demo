<script lang="tsx">
  import type { CSSProperties } from 'vue';
  import type { Menu } from '/@/router/types';
  import { getMenus } from '/@/router/menus';
  import { usePermissionStore } from '/@/store/modules/permission';
  import { computed, defineComponent, ref, unref, watch } from 'vue';
  import BasicMenu from '/@/components/Menu/src/BasicMenu.vue';
  import SimpleMenu from '/@/components/SimpleMenu/src/SimpleMenu.vue';
  import AppLogo from '/@/components/Application/src/AppLogo.vue';

  import { MenuModeEnum } from '/@/enums/menuEnum';

  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import ScrollContainer from '/@/components/Container/src/ScrollContainer.vue';

  import { useGo } from '/@/hooks/web/usePage';

  import { openWindow } from '/@/utils';
  import { propTypes } from '/@/utils/propTypes';
  import { isUrl } from '/@/utils/is';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useAppInject } from '/@/hooks/web/useAppInject';
  import { useDesign } from '/@/hooks/web/useDesign';

  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      theme: propTypes.oneOf(['light', 'dark']),
      // menu Mode
      // menuMode: {
      //   type: [String] as PropType<Nullable<MenuModeEnum>>,
      //   default: '',
      // },
    },
    setup(props) {
      const go = useGo();

      const { getMenuTheme, getCollapsed, getCollapsedShowTitle, getAccordion } = useMenuSetting();
      const { getShowLogo } = useRootSetting();

      const { prefixCls } = useDesign('layout-menu');

      const menusRef = ref<Menu[]>([]);
      const permissionStore = usePermissionStore();

      const { getIsMobile } = useAppInject();

      const getComputedMenuTheme = computed(() => props.theme || unref(getMenuTheme));

      const getIsShowLogo = computed(() => unref(getShowLogo) && unref(getIsMobile));

      const getUseScroll = computed(() => {
        return getIsMobile;
      });

      const getWrapperStyle = computed((): CSSProperties => {
        return {
          height: `calc(100% - ${unref(getIsShowLogo) ? '48px' : '0px'})`,
        };
      });

      const getLogoClass = computed(() => {
        return [
          `${prefixCls}-logo`,
          unref(getComputedMenuTheme),
          {
            [`${prefixCls}--mobile`]: unref(getIsMobile),
          },
        ];
      });

      const getCommonProps = computed(() => {
        const menus = unref(menusRef);
        return {
          menus,
          beforeClickFn: beforeMenuClickFn,
          items: menus,
          theme: unref(getComputedMenuTheme),
          accordion: unref(getAccordion),
          collapse: unref(getCollapsed),
          collapsedShowTitle: unref(getCollapsedShowTitle),
          onMenuClick: handleMenuClick,
        };
      });
      /**
       * click menu
       * @param menu
       */

      function handleMenuClick(path: string) {
        go(path);
      }

      /**
       * before click menu
       * @param menu
       */
      async function beforeMenuClickFn(path: string) {
        if (!isUrl(path)) {
          return true;
        }
        openWindow(path);
        return false;
      }

      function renderHeader() {
        if (!unref(getIsShowLogo)) return null;

        return (
          <AppLogo
            showTitle={!unref(getCollapsed)}
            class={unref(getLogoClass)}
            theme={unref(getComputedMenuTheme)}
          />
        );
      }

      function renderMenu() {
        const { menus, ...menuProps } = unref(getCommonProps);
        // console.log(menus);
        if (!menus || !menus.length) return null;
        return unref(getIsMobile) ? (
          <SimpleMenu {...menuProps} items={menus} />
        ) : (
          <BasicMenu {...(menuProps as any)} mode={MenuModeEnum.HORIZONTAL} items={menus} />
        );
      }
      // get menus
      async function genMenus() {
        // normal mode
        menusRef.value = await getMenus();
        return;
      }

      // Menu changes
      watch(
        () => permissionStore.getLastBuildMenuTime,
        () => {
          genMenus();
        },
        {
          immediate: true,
        },
      );

      return () => {
        return (
          <>
            {renderHeader()}
            {unref(getUseScroll) ? (
              <ScrollContainer style={unref(getWrapperStyle)}>{() => renderMenu()}</ScrollContainer>
            ) : (
              renderMenu()
            )}
          </>
        );
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-menu';
  @logo-prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    &-logo {
      height: @header-height;
      padding: 10px 4px 10px 10px;

      img {
        width: @logo-width;
        height: @logo-width;
      }
    }

    &--mobile {
      .@{logo-prefix-cls} {
        &__title {
          opacity: 100%;
        }
      }
    }
  }
</style>
