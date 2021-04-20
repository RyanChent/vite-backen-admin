<template>
  <pc-layout v-if="!isMobile" />
  <mobile-layout v-else />
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import pcLayout from "./PC/index.vue";
import mobileLayout from "./Mobile/index.vue";
export default defineComponent({
  props: {
    isMobile: Boolean,
  },
  components: {
    pcLayout,
    mobileLayout,
  },
  setup(props) {
    const { isMobile } = toRefs(props) as any;
    return {
      isMobile,
    };
  },
});
</script>
