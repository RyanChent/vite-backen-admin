import { defineComponent } from 'vue'
import { isFunction } from '@/utils/types'
import './style'
const PCUserLayout = defineComponent({
  name: 'PCUserLayout',
  componentName: 'ManageUserPCLayout',
  setup(props, { slots }: any) {
    return () => (
      <section class="vite-backen-pc-user">
        <section class="manage-pc-user">
          <header class="user-header">
            <img src="/assets/logo.png" />
            <span>vite-backen-admin</span>
          </header>
          <div class="user-form">
            {new Array(8).fill(<span class="shinning" />)}
            {isFunction(slots.default) && slots.default()}
          </div>
        </section>
      </section>
    )
  }
})

export default PCUserLayout
