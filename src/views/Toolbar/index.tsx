import { defineComponent, resolveComponent } from 'vue'
import './style'

const ToolBarDemo = defineComponent({
  name: 'TooBarPage',
  componentName: 'ManageToolBarPage',
  render() {
    const ToolBar: any = resolveComponent('ToolBar')
    const message = (this as any).$message
    return (
      <ToolBar
        barList={[
          {
            icon: 'el-icon-edit',
            title: '编辑',
            click: () => message.success('我是编辑')
          },
          {
            icon: 'van-plus',
            title: '新增',
            click: () => message.success('我是新增')
          },
          {
            icon: 'el-icon-search',
            title: '查找',
            click: () => message.success('我是查找')
          },
          {
            icon: 'el-icon-delete',
            title: '删除',
            click: () => message.success('我是删除')
          }
        ]}
      />
    )
  }
})

export default ToolBarDemo
