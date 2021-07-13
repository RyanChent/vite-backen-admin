import { defineComponent } from 'vue'
import { useRenderTree } from '@/hooks/uiRender'
import Tree from '@PC/Tree'
import RightContextMenu from '@PC/ContextMenus'

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
    return useRenderTree(props)
  },
  render() {
    return (
      <>
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
    )
  }
})

export default Node
