import { defineComponent, h, watch, ref, reactive } from 'vue'
import { isFunction } from '@/utils/types'
import { useRoute } from 'vue-router'
import mobileMenus from '@Mobile/Menus'
import globalFooter from '@Mobile/globalFooter'
import globalHeader from '@Mobile/globalHeader'
import { t } from '@/lang'
import './style'
const MobileLayout = defineComponent({
  name: 'mobileLayout',
  componentName: 'ManageMobileLayout',
  components: {
    mobileMenus,
    globalFooter,
    globalHeader
  },
  setup() {
    const route = useRoute()
    const title = ref<any>(route.meta.title)
    const showLeft = ref<any>(false)
    const touchStart = reactive<any>({
      x: 0,
      y: 0
    })
    watch(
      () => route.path,
      () => {
        title.value = route.meta.title
      }
    )
    const clickLeftOutside = (e: any) => {
      e.stopPropagation()
      touchStart.x = e.changedTouches[0].clientX
      touchStart.y = e.changedTouches[0].clientY
      if (showLeft.value) {
        showLeft.value = false
      }
    }
    const touchToShowMenu = (e: any) => {
      e.stopPropagation()
      const dx = e.changedTouches[0].clientX - touchStart.x
      if (dx >= 0.4 * window.innerWidth) {
        showLeft.value = true
      }
    }
    return {
      title,
      showLeft,
      touchStart,
      clickLeftOutside,
      touchToShowMenu
    }
  },
  render() {
    const slots: any = this.$slots
    const route: any = this.$route
    const store: any = (this as any).$store
    return route.path !== '/404' ? (
      <section
        class="backen-admin-mobile"
        onTouchstart={this.clickLeftOutside}
        onTouchend={this.touchToShowMenu}
      >
        <header
          class="backen-admin-mobile-head"
          style={{ display: this.$route.path === '/me' ? 'none' : undefined }}
        >
          {isFunction(slots.head) ? (
            slots.head(t(this.title), this.showLeft)
          ) : (
            <globalHeader v-model={this.showLeft} />
          )}
        </header>
        <main
          class="backen-admin-mobile-content"
          v-loading={store.state.permission.loading}
          element-loading-text="页面加载中，请稍后"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          {isFunction(slots.menus) ? slots.menu() : <mobileMenus t={t} v-model={this.showLeft} />}
          {isFunction(slots.default) && slots.default()}
        </main>
        <footer class="backen-admin-mobile-footer">
          {isFunction(slots.footer) ? slots.footer() : <globalFooter />}
        </footer>
      </section>
    ) : (
      isFunction(slots.default) && slots.default()
    )
  }
})

export default MobileLayout
