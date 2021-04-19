<template>
  <basic-layout>
    <router-view v-slot="{ Component }">
      <transition enter-active-class="animated fadeIn">
        <component :is="Component" />
      </transition>
    </router-view>
  </basic-layout>
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";
import basicLayout from "./layout/basicLayout.vue";
import { isMobile } from "./utils/types";
export default defineComponent({
  name: "App",
  components: {
    basicLayout,
  },
  setup() {
    provide("isMobile", isMobile);
    return {
      isMobile,
    };
  },
});
</script>

<style>
#app {
  font-family: Microsoft YaHei, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: all 0.4s;
}
</style>
