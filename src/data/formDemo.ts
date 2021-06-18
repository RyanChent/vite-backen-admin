export default [
  {
    label: '测试文本框',
    content: 'el-input',
    prop: 'test1',
    required: true,
    attr: {}
  },
  {
    label: '测试图片上传',
    content: 'ImageUpload',
    prop: 'test2',
    required: true,
    attr: {
      action: ''
    }
  },
  {
    label: '测试单选框',
    content: 'el-radio-group',
    prop: 'test3',
    required: true,
    attr: {},
    slots: [
      { label: '是', value: true },
      { label: '否', value: false }
    ]
  },
  {
    label: '测试复选框',
    content: 'el-checkbox-group',
    prop: 'test4',
    required: true,
    attr: {},
    slots: [
      { label: '是', value: true },
      { label: '否', value: false }
    ]
  },
  {
    label: '测试下拉单选',
    content: 'el-select',
    prop: 'test5',
    required: true,
    attr: {},
    slots: [
      {
        label: '测试1',
        value: 'test1'
      },
      {
        label: '测试2',
        value: 'test2'
      },
      {
        label: '测试3',
        value: 'test3'
      }
    ]
  },
  {
    label: '测试下拉多选',
    content: 'el-select',
    prop: 'test6',
    required: true,
    attr: {
      multiple: true
    },
    slots: [
      {
        label: '测试1',
        value: 'test1'
      },
      {
        label: '测试2',
        value: 'test2'
      },
      {
        label: '测试3',
        value: 'test3'
      }
    ]
  }
]
