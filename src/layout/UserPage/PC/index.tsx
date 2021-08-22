import { defineComponent } from 'vue'
import { isFunction } from '@/utils/types'
import './style'
import { useStore } from 'vuex'
const PCUserLayout = defineComponent({
  name: 'PCUserLayout',
  componentName: 'ManageUserPCLayout',
  setup(props, { slots }: any) {
    const store = useStore()
    return () => (
      <section class="vite-backen-pc-user">
        <section class="manage-pc-user">
          <header class="user-header">
            <img src="/assets/logo.png" />
            <span>vite-backen-admin</span>
          </header>
          <div
            class="user-form"
            v-loading={store.state.permission.loading}
            element-loading-text="页面加载中，请稍后"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
          >
            {new Array(8).fill(<span class="shinning" />)}
            {isFunction(slots.default) && slots.default()}
          </div>
        </section>
      </section>
    )
  }
})

export default PCUserLayout
