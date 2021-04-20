<template></template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive } from "vue";

export default defineComponent({
  setup() {
    const { ctx } = getCurrentInstance() as any;
    const router = reactive(ctx.$router.options.routes);
    return {
      router,
    };
  },
});
</script>

<style lang="less"></style>
