<template>
  <BasicLayout>
    <router-view v-slot="{ Component }">
      <transition enter-active-class="animated fadeIn">
        <component :is="Component" />
      </transition>
    </router-view>
  </BasicLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BasicLayout from "./layout/basicLayout.vue";
export default defineComponent({
  name: "App",
  components: {
    BasicLayout,
  },
});
</script>

<style>
#app {
  font-family: Microsoft YaHei, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  transition: all 0.4s;
}
</style>
