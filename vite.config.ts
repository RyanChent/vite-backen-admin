import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import styleImport from "vite-plugin-style-import";
const path = require("path");
const resolve = (param) => path.join(__dirname, param);
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/utils": resolve("src/utils"),
      "@/PC": resolve("src/components/PC"),
      "@/Mobile": resolve("src/components/Mobile"),
      "@/views": resolve("src/views"),
    },
  },
  server: {
    open: true,
  },
  build: {
    brotliSize: false,
  },
  logLevel: "warn",
  plugins: [
    vue(),
    vueJsx({}),
    styleImport({
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            name = name.slice(3);
            return `element-plus/packages/theme-chalk/src/${name}.scss`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 用于全局导入，以避免需要单独导入每个样式文件。
          // reference:  避免重复引用
          hack: `true; @import (reference) "${resolve(
            "src/styles/var.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
});
