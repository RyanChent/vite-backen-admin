<template>
  <el-container class="backen-admin-pc" direction="vertical">
    <el-header class="backen-admin-pc-navbar"></el-header>
    <el-container direction="horizontal">
      <el-aside>
        <slot name="menu" v-if="hasMenuSlot" />
        <Menus v-else />
      </el-aside>
      <el-container direction="vertical">
        <el-header></el-header>
        <el-main>
          <slot />
        </el-main>
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Menus from "@/PC/Menus/index.vue";
import { isFunction } from "../../utils/types";

export default defineComponent({
  name: "PCLayout",
  components: {
    Menus,
  },
  setup(props, { slots }) {
    const hasMenuSlot = isFunction(slots.menu);
    return {
      hasMenuSlot,
    };
  },
});
</script>

<style lang="less" src="./style.less" />
