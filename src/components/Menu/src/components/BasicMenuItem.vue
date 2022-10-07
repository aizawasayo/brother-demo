<template>
  <a-menu-item :key="item.path">
    <MenuItemContent v-bind="$props" :item="item" />
  </a-menu-item>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { itemProps } from '../props';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/hooks/web/useDesign';

  import MenuItemContent from './MenuItemContent.vue';
  export default defineComponent({
    name: 'BasicMenuItem',
    components: { MenuItemContent },
    props: itemProps,
    setup() {
      const { t } = useI18n();
      const { prefixCls } = useDesign('basic-menu-item-content');
      return { t, prefixCls };
    },
  });
</script>
