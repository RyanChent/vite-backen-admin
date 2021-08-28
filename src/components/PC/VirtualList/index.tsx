import { defineComponent } from 'vue'
import { useVirtualList } from '@/hooks/virtualList'
import './style'

const VirtualList = defineComponent({
  name: 'VirtualList',
  componentName: 'ManageVirtualList',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    size: {
      type: Number,
      default: 15
    }
  },
  setup(props, { emit }: any) {
    return useVirtualList(props, emit)
  },
  render() {
    const slots: any = this.$slots
    return (
      <section class="manage-virtual-list">
        <ul class="virtual-list">
          {this.pageList.length === 0 && slots.default
            ? slots.default()
            : this.pageList.map((item: any, index: number) => <li key={index}></li>)}
        </ul>
      </section>
    )
  }
})

export default VirtualList
