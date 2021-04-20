<template>
  <el-menu v-model:defaultActive="defaultIndex" router unique-opened :collapse="collapse">
    <template v-for="(route, index) in router">
      <sub-menus
        v-if="Array.isArray(route.children) && route.children.length"
        :key="route.redirect || route.path || index"
        :route="route"
      />
      <el-menu-item v-else :key="route.path || index" :index="route.path">
        <template #title>
          <i
            v-if="route.meta && isNotEmptyString(route.meta.icon)"
            :class="route.meta.icon"
          />
          {{ route.meta.title }}
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from "vue";
import { isNotEmptyString } from "@/utils/types";
import SubMenus from "./subMenus/index.vue";

export default defineComponent({
  name: "Menus",
  componentName: "ManageMenus",
  components: {
    SubMenus,
  },
  props: {
    collapse: Boolean,
  },
  setup(props) {
    const { proxy } = getCurrentInstance() as any;
    const router = reactive(proxy.$router.options.routes);
    const defaultIndex = ref(
      isNotEmptyString(router[0].redirect) ? router[0].redirect : router[0].path
    );
    return {
      router,
      defaultIndex,
      isNotEmptyString,
      collapse: props.collapse,
    };
  },
});
</script>

<style lang="less"></style>
