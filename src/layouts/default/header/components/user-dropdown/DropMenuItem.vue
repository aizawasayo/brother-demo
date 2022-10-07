<template>
  <a-menu-item :key="itemKey">
    <span class="flex items-center">
      <Icon :icon="icon" class="mr-1" />
      <span>{{ text }}</span>
    </span>
  </a-menu-item>
</template>
<script lang="ts">
  import { computed, defineComponent, getCurrentInstance } from 'vue';
  import { propTypes } from '/@/utils/propTypes';

  export default defineComponent({
    name: 'DropdownMenuItem',
    props: {
      key: propTypes.string,
      text: propTypes.string,
      icon: propTypes.string,
    },
    setup(props) {
      const instance = getCurrentInstance();
      const itemKey = computed(() => props.key || instance?.vnode?.props?.key);
      return { itemKey };
    },
  });
</script>
