export default (): Array<any> => [
    {
        title: '测试步骤1',
        icon: () => <van-icon name="info-o" />,
        description: '用了vant的图标'
    },
    {
        title: () => <span style="color: #606266">测试步骤2</span>,
        icon: 'el-icon-edit',
        description: () => <span style="color: #909299">用了element-icon，自定义插槽</span>
    },
    {
        title: '测试步骤3',
        icon: () => <van-icon name="gem-o" />,
        description: () => <span style="color: #409eff">使用vant图标</span>
    }
]