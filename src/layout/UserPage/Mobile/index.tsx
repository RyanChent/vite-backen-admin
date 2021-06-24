import { defineComponent } from 'vue'
import { isFunction } from '@/utils/types'
import './style'
const MobileUserLayout = defineComponent({
  name: 'MobileUserLayout',
  componentName: 'ManageUserMobileLayout',
  setup(props, { slots }: any) {
    return () => (
      <section class="vite-backen-mobile-login blur">
        <section class="manage-mobile-login">
          {new Array(8).fill(<span class="shinning" />)}
          <header class="user-header">
            <img src="/assets/logo.png" />
            <span>vite-backen-admin</span>
          </header>
          <div class="user-form">{isFunction(slots.default) && slots.default()}</div>
        </section>
      </section>
    )
  }
})

export default MobileUserLayout
