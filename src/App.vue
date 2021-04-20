<template>
  <layout :isMobile="isPhone">
    <router-view v-slot="{ Component }">
      <transition enter-active-class="animated fadeIn">
        <component :is="Component" />
      </transition>
    </router-view>
  </layout>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, provide, ref } from "vue";
import layout from "./layout/index.vue";
import { isMobile } from "./utils/types";
import * as _ from "lodash";
export default defineComponent({
  name: "App",
  components: {
    layout,
  },
  setup() {
    const isPhone = ref(isMobile());
    // 监听窗口变化
    window.addEventListener(
      "resize",
      _.debounce(() => {
        isPhone.value = isMobile();
      }, 500)
    );
    provide("isMobile", () => isPhone);
    onBeforeUnmount(() => {
      // 移除窗口监听
      window.removeEventListener(
        "resize",
        _.debounce(() => {
          isPhone.value = isMobile();
        })
      );
    });
    return {
      isPhone,
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
