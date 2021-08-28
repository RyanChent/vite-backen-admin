import { defineComponent, resolveComponent } from 'vue'
import { useSnapShots } from '@/hooks/snapShot'
import { DefaultProps } from '@/utils/props'
import './style'

const SnapShot = defineComponent({
  name: 'SnapShot',
  componentName: 'ManageSnapShot',
  props: {
    target: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'VNode'
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props: any, { emit }: any) {
    return useSnapShots(props, emit)
  },
  render() {
    let VNode: any,
      VNodeOptions = {}
    if (!this.renderFinish && this.type === 'VNode') {
      VNode = resolveComponent(this.target)
      VNodeOptions = Object.assign({}, DefaultProps(VNode.props), this.options)
    }
    return (
      <div class="manage-snapshot-dom">
        {this.img ? (
          <el-image src={this.img} alt="snapShot" fit="cover" />
        ) : (
          VNode && <VNode {...this.VNodeOptions} id={this.domid} />
        )}
      </div>
    )
  }
})

export default SnapShot
