<template>
  <slot
    :name="slotsName"
    v-if="hasCurrentMenuSlot"
    :route="route"
    :depth="depth"
  />
  <template v-else>
    <el-submenu
      :index="route.redirect"
      v-if="Array.isArray(route.children) && route.children.length"
    >
      <template #title>
        <i
          v-if="route.meta && isNotEmptyString(route.meta.icon)"
          :class="route.meta.icon"
        />
        <span v-if="route.meta">{{ route.meta.title }}</span>
      </template>
      <sub-menus
        v-for="(subroute, index) in route.children"
        :route="subroute"
        :key="subroute.redirect || subroute.path || index"
        :depth="depth + 1"
      />
    </el-submenu>
    <el-menu-item v-else :index="route.path">
      <template #title>
        <i
          v-if="route.meta && isNotEmptyString(route.meta.icon)"
          :class="route.meta.icon"
        />
        {{ route.meta.title }}
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { isNotEmptyString, isFunction } from "@/utils/types";
export default defineComponent({
  name: "SubMenus",
  components: {
    SubMenus: () => import("@/PC/Menus/subMenus/index.vue"),
  },
  props: {
    depth: {
      type: Number,
      default: 1,
    },
    route: {
      type: [Array, Object],
      default: () => [],
    },
  },
  setup(props, { slots }) {
    const slotsName: string = `menu-${props.depth}`;
    const hasCurrentMenuSlot: boolean = isFunction(slots[slotsName]);
    return {
      depth: props.depth,
      route: props.route,
      hasCurrentMenuSlot,
      slotsName,
      isNotEmptyString,
    };
  },
});
</script>
