<template>
  <el-container v-if="!isMobile" class="erp-pc">
    <el-aside>Aside</el-aside>
    <el-container>
      <el-header></el-header>
      <el-main>
        <slot />
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
  <section class="erp-mobile">
    <header></header>
    <main>
      <slot />
    </main>
    <footer></footer>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";

export default defineComponent({
  setup(props) {
    const isMobile = computed(() => (inject("isMobile") as any)());
    return {
      isMobile,
    };
  },
});
</script>

<style lang="less" src="./basicLayout.less" />
