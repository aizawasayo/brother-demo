<template>
  <a-drawer
    placement="left"
    :class="`${prefixCls}-wrapper`"
    :width="getMenuWidth"
    :getContainer="null"
    :visible="!getCollapsed"
    @close="handleClose"
  >
    <a-layout-sider
      ref="sideRef"
      breakpoint="lg"
      collapsible
      :class="getSiderClass"
      :width="getMenuWidth"
      :collapsed="getCollapsed"
      :collapsedWidth="getCollapsedWidth"
      :theme="getMenuTheme"
      @breakpoint="onBreakpointChange"
      :trigger="null"
    >
      <LayoutMenu :theme="getMenuTheme" />
      <DragBar ref="dragBarRef" />
    </a-layout-sider>
  </a-drawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';

  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import LayoutMenu from '../menu.vue';
  import { useDragLine, useSiderEvent } from './useLayoutSider';
  import DragBar from './DragBar.vue';

  export default defineComponent({
    name: 'SiderWrapper',
    components: { LayoutMenu, DragBar },
    setup() {
      const { prefixCls } = useDesign('layout-sider');

      const { setMenuSetting, getCollapsed, getMenuWidth, getMenuTheme, toggleCollapsed } =
        useMenuSetting();
      const dragBarRef = ref<ElRef>(null);
      const sideRef = ref<ElRef>(null);

      useDragLine(sideRef, dragBarRef);

      const { getCollapsedWidth, onBreakpointChange } = useSiderEvent();

      const getSiderClass = computed(() => {
        return [`${prefixCls}-bar`, `${prefixCls}-bar--fixed`];
      });

      function handleClose() {
        setMenuSetting({
          collapsed: true,
        });
      }

      return {
        prefixCls,
        getCollapsed,
        handleClose,
        getMenuWidth,
        sideRef,
        dragBarRef,
        getSiderClass,
        getCollapsedWidth,
        getMenuTheme,
        onBreakpointChange,
        toggleCollapsed,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-sider';

  .@{prefix-cls} {
    &-wrapper {
      .ant-drawer-body {
        height: 100vh;
        padding: 0;
      }

      .ant-drawer-header-no-title {
        display: none;
      }
    }

    &-bar {
      z-index: @layout-sider-fixed-z-index;

      &--fixed {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
      }
      &.ant-layout-sider-dark {
        background-color: @sider-dark-bg-color;

        .ant-layout-sider-trigger {
          color: darken(@white, 25%);
          background-color: @trigger-dark-bg-color;

          &:hover {
            color: @white;
            background-color: @trigger-dark-hover-bg-color;
          }
        }
      }

      &:not(.ant-layout-sider-dark) {
        // box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

        .ant-layout-sider-trigger {
          color: @text-color-base;
          border-top: 1px solid @border-color-light;
        }
      }
    }
  }
</style>
