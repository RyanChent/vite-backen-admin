import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport from 'vite-plugin-style-import'
import { VitePWA } from 'vite-plugin-pwa'
import { vitePluginSitemap } from './plugins/vite-plugin-sitemap'
import { svgBuilder } from './plugins/vite-plugin-svg'
import vitePluginVuedoc, { vueDocFiles } from 'vite-plugin-vuedoc'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@PC': resolve(__dirname, 'src/components/PC'),
      '@Mobile': resolve(__dirname, 'src/components/Mobile')
    },
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.css', '.less', '.mjs']
  },
  server: {
    port: 9527,
    host: '0.0.0.0',
    open: true,
    cors: true
  },
  build: {
    brotliSize: false,
    polyfillDynamicImport: true
  },
  logLevel: 'warn',
  plugins: [
    vitePluginVuedoc({
      previewComponent: 'CodePreview'
    }),
    vue({
      include: [...vueDocFiles]
    }),
    vitePluginSitemap(),
    vueJsx({}),
    svgBuilder('./src/assets/icons/svg/'),
    VitePWA(),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            name = name.slice(3)
            return `element-plus/packages/theme-chalk/src/${name}.scss`
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`
          }
        }
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 用于全局导入，以避免需要单独导入每个样式文件。
          // reference:  避免重复引用
          hack: `true; @import (reference) "${resolve('src/styles/var.less')}";`
        },
        javascriptEnabled: true
      }
    }
  }
})
