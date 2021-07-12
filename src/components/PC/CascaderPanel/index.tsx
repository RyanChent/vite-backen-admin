import { ref, defineComponent } from 'vue'
import { isFunction } from '@/utils/types'
import './style'

const CascaderPanel = defineComponent({
  name: 'CascaderPanel',
  componentName: 'ManageCascaderPanel',
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {
      currentClick: ref<any[]>([])
    }
  },
  render() {
    const slots: any = this.$slots
    return (
      <section class="manage-cascader-panel">
        <ul class="cascader-content">
          {this.options.map((item: any) => (
            <li
              class={{
                selected: this.currentClick[0] && this.currentClick[0].value === item.value
              }}
              onClick={(e: MouseEvent) => {
                e.stopPropagation()
                if (Array.isArray(item.children)) {
                  this.currentClick = [item]
                } else {
                  this.currentClick = []
                }
              }}
            >
              {isFunction(item.label) ? (
                item.label({ data: item, level: 1, parent: null })
              ) : isFunction(slots.level1) ? (
                slots.level1({ data: item, level: 1, parent: null })
              ) : (
                <span v-html={item.label} />
              )}
              {Array.isArray(item.children) && <i class="el-icon-arrow-right" />}
            </li>
          ))}
        </ul>
        {this.currentClick.length > 0 &&
          this.currentClick.map((item: any, index: number) => (
            <ul class="cascader-content">
              {Array.isArray(item.children) && item.children.length > 0 ? (
                item.children.map((subItem: any) => (
                  <li
                    onClick={(e: MouseEvent) => {
                      e.stopPropagation()
                      if (Array.isArray(subItem.children)) {
                        this.currentClick[index + 1] = subItem
                      } else {
                        this.currentClick = this.currentClick.slice(0, index + 1)
                      }
                    }}
                    class={{
                      selected:
                        this.currentClick[index + 1] &&
                        this.currentClick[index + 1].value === subItem.value
                    }}
                  >
                    {isFunction(subItem.label) ? (
                      subItem.label({ data: subItem, level: index + 2, parent: item })
                    ) : isFunction(slots[`level${index + 2}`]) ? (
                      slots[`level${index + 2}`]({ data: subItem, level: index + 2, parent: item })
                    ) : (
                      <span v-html={subItem.label} />
                    )}
                    {Array.isArray(subItem.children) && <i class="el-icon-arrow-right" />}
                  </li>
                ))
              ) : isFunction(slots.lastOne) ? (
                slots.lastOne(this.currentClick[this.currentClick.length - 1])
              ) : (
                <el-empty description="暂无数据" />
              )}
            </ul>
          ))}
      </section>
    )
  }
})

export default CascaderPanel
