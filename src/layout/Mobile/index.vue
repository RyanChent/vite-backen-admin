<template>
  <section class="backen-admin-mobile">
    <header></header>
    <main>
      <slot />
    </main>
    <footer></footer>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<style lang="less" src="./style.less" />
