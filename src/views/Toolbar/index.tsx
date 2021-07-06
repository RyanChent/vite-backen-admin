import { defineComponent, resolveComponent } from 'vue'
import './style'

const getBarList = (callback: Function) => [
  {
    icon: 'el-icon-edit',
    title: '编辑',
    click: () => callback('我是编辑')
  },
  {
    icon: 'van-plus',
    title: '新增',
    click: () => callback('我是新增')
  },
  {
    icon: 'el-icon-search',
    title: '查找',
    click: () => callback('我是查找')
  },
  {
    icon: 'el-icon-delete',
    title: '删除',
    click: () => callback('我是删除')
  }
]

const ToolBarDemo = defineComponent({
  name: 'TooBarPage',
  componentName: 'ManageToolBarPage',
  render() {
    const ToolBar: any = resolveComponent('ToolBar')
    const barList = getBarList((this as any).$message.success)
    return (
      <section class="manage-toolbar-page">
        <ToolBar barList={barList} style="left: 90%" />
        <ToolBar barList={barList} direction="column" style="left: 40%;" />
        <ToolBar barList={barList} direction="column" draggable />
      </section>
    )
  }
})

export default ToolBarDemo
