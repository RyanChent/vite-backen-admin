<template>
  <main class="basic-layout">
    <el-backtop :bottom="height + 20" :visibility-height="30" :right="100">
      <div class="back-to-top">
        <i class="el-icon-position" title="返回顶部" />
      </div>
    </el-backtop>
    <div
      class="header-container"
      :style="{
        'background-image':
          routeIndex === '/home' ? 'url(/src/assets/banner_bg.jpg)' : undefined,
      }"
    >
      <header class="page-header">
        <div class="page-header-content">
          <img src="../assets/logo.png" />
          <el-menu
            router
            mode="horizontal"
            v-model:defaultActive="routeIndex"
            active-text-color="#fff"
            background-color="transparent"
            @select="
              (index) => {
                routeIndex = index;
              }
            "
          >
            <el-menu-item
              v-for="route in routes"
              :index="route.path"
              :key="route.path"
              >{{ route.title }}</el-menu-item
            >
          </el-menu>
        </div>
      </header>
      <div class="home-header-content" v-if="routeIndex === '/home'">
        <div class="left-desc">
          <p
            style="
              color: #fff;
              font-size: 3rem;
              line-height: 50px;
              font-family: Microsoft YaHei;
              font-weight: bold;
            "
          >
            一站式<span style="color: #fb8b64">跨境电商</span
            ><span style="font-size: 2rem">服务平台</span><br />
            <span style="font-size: 1.5rem; font-weight: normal"
              >为企业跨境出海，提供更高效的选择！</span
            >
          </p>
          <p>
            <el-button class="operate-button" @click="goToPrice"
              >我要去了解</el-button
            >
          </p>
        </div>
        <div class="right-pic" />
      </div>
      <div
        v-else
        :style="{
          'background-image': `url(/src/assets/${routeIndex.slice(1)}.jpg)`,
          'background-size': 'cover',
          'background-repeat': 'no-repeat',
          'background-color': 'rgba(0, 0, 0, 0.5)',
          width: '100%',
          minHeight: '250px',
          display: 'flex',
        }"
      />
    </div>
    <section class="page-content">
      <slot />
    </section>
    <footer class="page-footer" id="footer">
      <header class="page-footer-menu">
        <ul>
          <li
            v-for="route in routes"
            :key="route.path"
            :class="{ selected: route.path === routeIndex }"
          >
            <router-link
              :to="route.path"
              @click="
                () => {
                  routeIndex = route.path;
                }
              "
              >{{ route.title }}</router-link
            >
            <span />
          </li>
          <li :class="{ selected: routeIndex === privatePolicy.path }">
            <router-link
              :to="privatePolicy.path"
              @click="
                () => {
                  routeIndex = privatePolicy.path;
                }
              "
            >
              {{ privatePolicy.title }}
            </router-link>
          </li>
        </ul>
        <div class="friend-link">
          <span>友情链接</span>
          <span class="logo">
            <i class="el-icon-minus" />
            <i class="el-icon-minus" />
            <i class="el-icon-minus" />
          </span>
        </div>
      </header>
      <section class="page-footer-content">
        <div>
          <p>联系方式</p>
          <p>
            <i class="el-icon-mobile-phone" />
            13602518729
          </p>
          <p>
            <i class="el-icon-message" />
            <a href="mailto:zeyunerp@outlook.com">zeyunerp@outlook.com</a>
          </p>
          <p>
            <i class="el-icon-map-location" />
            深圳市龙岗区平湖街道禾花社区华南大道一号华南国际纺织服装原辅料物流区二期3E-101号
          </p>
        </div>
        <div class="right-logo" style="width: 365px; height: 80px" />
      </section>
      <footer class="page-footer-copyright">
        Copyright&copy; {{ new Date().getFullYear() }} 深圳哲远贸易有限公司，All
        Rights Reserved
      </footer>
    </footer>
  </main>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  reactive,
  getCurrentInstance,
  onMounted,
} from "vue";
import * as _ from "lodash";
export default defineComponent({
  name: "BasicLayout",
  setup() {
    const { ctx }: any = getCurrentInstance();
    const routes = ctx.$router.options.routes.filter(
      (route: any) => route.component
    );
    const routeIndex = ref(routes[0].path);
    const height = ref(0);
    const privatePolicy = reactive(routes.pop());
    const goToPrice = () => {
      ctx.$router.push("/price");
      routeIndex.value = "/price";
    };
    const getHeight = (dom: any): void => {
      height.value = dom.offsetHeight;
    };
    onMounted(() => {
      const footer = document.getElementById("footer") as any;
      getHeight(footer);
      window.addEventListener(
        "resize",
        _.debounce(() => getHeight(footer), 400)
      );
    });
    return {
      routes,
      privatePolicy,
      routeIndex,
      goToPrice,
      height,
    };
  },
});
</script>

<style lang="less" src="./basicLayout.less" />
