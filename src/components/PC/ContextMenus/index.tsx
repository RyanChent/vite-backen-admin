import { computed, defineComponent } from 'vue'
import { isFunction } from '@/utils/types'
import { t } from '@/lang'
import './style'
const RightContextMenu = defineComponent({
  name: 'ContextMenu',
  componentName: 'ManageContextMenu',
  __file: '@PC/ContextMenus',
  emits: ['update:visible'],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    menus: {
      type: Array,
      default: () => []
    },
    left: [String, Number],
    top: [String, Number]
  },
  setup(props, { emit }: any) {
    return {
      rightVisible: computed({
        get() {
          return props.visible
        },
        set(value) {
          emit('update:visible', value)
        }
      })
    }
  },
  render() {
    return (
      <section
        class="manage-right-menu"
        id="right-menu"
        v-click-outside={() => (this.rightVisible = false)}
        style={{
          left: typeof this.left === 'number' ? `${this.left}px` : this.left,
          top: typeof this.top === 'number' ? `${this.top}px` : this.top,
          display: !this.visible ? 'none' : undefined
        }}
        onContextmenu={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
      >
        <ul>
          {this.menus.map((menu: any, index: number) => (
            <li
              onClick={() => {
                isFunction(menu.click) && menu.click()
                this.rightVisible = false
              }}
              key={index}
            >
              {t(menu.title)}
            </li>
          ))}
        </ul>
      </section>
    )
  }
})

export default RightContextMenu
