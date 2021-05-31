import { defineComponent, ref } from 'vue'
import Tree from '@PC/Tree'
import RightContextMenu from '@PC/ContextMenus'

const useRenderTree = (props: any) => {
  const visible = ref<boolean>(false)
  const current = ref<any>({})
  const top = ref<number>(0)
  const left = ref<number>(0)
  const treeNodeRightClick = (e: MouseEvent, data: any, node: any, treeRef: any) => {
    const { clientX, clientY } = e
    top.value = clientY
    left.value = clientX
    current.value = data
    visible.value = true
  }
  const rightMenus = [
    {
      title: 'remove component',
      click: () => {
        const cid = props.renderStr.findIndex((item: any) => item.id === current.value.id)
        if (cid > -1) {
          props.renderStr.splice(cid, 1)
        }
      }
    }
  ]
  return {
    visible,
    treeNodeRightClick,
    current,
    top,
    left,
    rightMenus
  }
}

const Node = defineComponent({
  name: 'ComponentNode',
  componentName: 'ManageComponentNode',
  components: {
    Tree: defineComponent(Tree),
    RightContextMenu: defineComponent(RightContextMenu)
  },
  props: {
    renderStr: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const { visible, treeNodeRightClick, top, left, rightMenus } = useRenderTree(props)
    return {
      visible,
      treeNodeRightClick,
      top,
      left,
      rightMenus
    }
  },
  render() {
    return <>
      <Tree
        data={this.renderStr}
        showSearch
        node-key="id"
        empty-text="暂无节点"
        onNodeContextMenu={this.treeNodeRightClick}
        props={{
          label: 'key',
          children: 'slots'
        }}
      />
      <RightContextMenu
        v-model={[this.visible, 'visible']}
        top={this.top}
        left={this.left}
        menus={this.rightMenus}
      />
    </>
  }
})

export default Node
