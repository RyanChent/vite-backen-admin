import { defineComponent } from 'vue'
import { useToolBarProps } from '@/hooks/toolbar'
import { isFunction } from '@/utils/types'
import './style'

const ToolBar = defineComponent({
  name: 'ToolBar',
  componentName: 'ManageToolBar',
  props: {
    barList: {
      type: Array,
      default: () => []
    },
    direction: {
      type: String,
      default: 'row'
    },
    draggable: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }: any) {
    return useToolBarProps(props, emit)
  },
  render() {
    const slots: any = this.$slots
    return (
      <div class="manage-toolbar-list" ref={(el: any) => el && (this.toolBar = el)}>
        {isFunction(slots.default) && this.barList.length === 0 ? (
          slots.default()
        ) : (
          <ul class={this.direction}>
            <li>
              <i
                class={this.expandIconClass}
                title={this.expand ? '收缩' : '展开'}
                onClick={() => (this.expand = !this.expand)}
              />
            </li>
            {this.barList.map((bar: any) => {
              const { icon, click, title } = bar
              const realIcon = icon.startsWith('van-') ? (
                <van-icon name={icon.slice('van-'.length)} />
              ) : (
                <i class={icon} />
              )
              return (
                <li
                  onClick={click}
                  title={title}
                  class={{
                    expand: this.expand
                  }}
                >
                  {realIcon}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
})

export default ToolBar
