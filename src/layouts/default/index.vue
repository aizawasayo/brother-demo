<template>
  <a-layout :class="prefixCls">
    <LayoutFeatures />
    <LayoutHeader fixed />
    <a-layout class="ant-layout ant-layout-has-sider">
      <LayoutSideBar v-if="getIsMobile" />
      <a-layout :class="`${prefixCls}-main`">
        <div :style="getPlaceholderDomStyle"></div>
        <LayoutBreadcrumb v-if="getShowBreadCrumb && !getIsMobile" />
        <LayoutContent />
        <LayoutFooter />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
  import { defineComponent, computed, CSSProperties } from 'vue';

  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';

  import LayoutHeader from './header/index.vue';
  import LayoutContent from './content/index.vue';
  import LayoutSideBar from './sider/index.vue';
  import LayoutBreadcrumb from './breadcrumb.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useAppInject } from '/@/hooks/web/useAppInject';
  import { useLayoutHeight } from './content/useContentViewHeight';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      LayoutFeatures: createAsyncComponent(() => import('./feature.vue')),
      LayoutFooter: createAsyncComponent(() => import('/@/layouts/default/footer/index.vue')),
      LayoutHeader,
      LayoutContent,
      LayoutSideBar,
      LayoutBreadcrumb,
    },
    setup() {
      const { prefixCls } = useDesign('default-layout');
      const { getIsMobile } = useAppInject();

      const { getShowBreadCrumb } = useRootSetting();

      const { setHeaderHeight } = useLayoutHeight();

      const getPlaceholderDomStyle = computed((): CSSProperties => {
        let height = 60;

        setHeaderHeight(height);
        return {
          height: `${height}px`,
        };
      });
      return {
        prefixCls,
        getIsMobile,
        getShowBreadCrumb,
        getPlaceholderDomStyle,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-default-layout';

  .@{prefix-cls} {
    display: flex;
    width: 100%;
    min-height: 100%;
    background-color: @content-bg;
    flex-direction: column;

    > .ant-layout {
      min-height: 100%;
    }

    &-main {
      width: 100%;
      margin-left: 1px;
    }
  }
</style>
