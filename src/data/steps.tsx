export default (): Array<any> => [
  {
    title: '自定义图标',
    icon: () => <van-icon name="info-o" />,
    description: '用了vant的图标'
  },
  {
    title: () => <span style="color: #606266">自定义标题</span>,
    icon: 'el-icon-edit',
    description: () => <span style="color: #909299">自定义描述</span>
  },
  {
    title: '自定义描述',
    icon: () => <van-icon name="gem-o" />,
    description: () => <span style="color: #409eff">自定义描述</span>
  },
  {
    title: '没有描述',
    icon: 'el-icon-message'
  },
  {
    title: '没有描述图标'
  }
]
