import { isNotEmptyString } from '@/utils/types'

const getShortCuts = () => [
  {
    text: '最近一周',
    value: (() => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    })()
  },
  {
    text: '最近一个月',
    value: (() => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    })()
  },
  {
    text: '最近三个月',
    value: (() => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    })()
  }
]

const formDemo = [
  {
    label: '测试文本框',
    content: 'el-input',
    prop: 'test1',
    attr: {
      size: 'small'
    },
    rules: [
      { required: true, message: '测试1不能为空' },
      { type: 'number', message: '测试1必须为数字' }
    ],
    linkage(model: any) {
      if (isNotEmptyString(model[this.prop])) {
        model[this.prop] = Number(model[this.prop].replace(/[^\d]/g, ''))
      }
    }
  },
  {
    label: '测试快捷时间范围',
    content: 'el-date-picker',
    prop: 'test9',
    attr: {
      type: 'datetimerange',
      shortcuts: getShortCuts(),
      rangeSeparator: '至',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      align: 'right',
      size: 'small'
    },
    hide: true
  },
  {
    label: '测试时间范围',
    content: 'el-time-picker',
    prop: 'test8',
    attr: {
      'is-range': true,
      'arrow-control': true,
      'range-separator': '至',
      'start-placeholder': '开始时间',
      'end-placeholder': '结束时间',
      size: 'small'
    },
    linkage(model: any, items: any) {
      items[1].hide = !(Array.isArray(model[this.prop]) && model[this.prop].length > 0)
    }
  },
  {
    label: '测试单选框',
    content: 'el-radio-group',
    prop: 'test3',
    required: true,
    attr: {},
    slots: [
      { slot: '是', label: true },
      { slot: '否', label: false }
    ]
  },
  {
    label: '测试复选框',
    content: 'el-checkbox-group',
    prop: 'test4',
    required: true,
    attr: {},
    slots: [
      { label: 'test1', slot: '测试1' },
      { label: 'test2', slot: '测试2' },
      { label: 'test3', slot: '测试3' }
    ]
  },
  {
    label: '测试下拉单选',
    content: 'el-select',
    prop: 'test5',
    required: true,
    attr: {
      size: 'small'
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
    ],
    linkage(model: any, items: any) {
      if (isNotEmptyString(model[this.prop])) {
        items[6].slots = [
          {
            label: '测试4',
            value: 'test4'
          }
        ]
      } else {
        items[6].slots = [
          {
            label: '测试1',
            value: 'test1'
          },
          {
            label: '测试2',
            value: 'test2'
          }
        ]
      }
    }
  },
  {
    label: '测试下拉多选',
    content: 'el-select',
    prop: 'test6',
    required: true,
    attr: {
      multiple: true,
      size: 'small'
    },
    slots: [
      {
        label: '测试1',
        value: 'test1'
      },
      {
        label: '测试2',
        value: 'test2'
      }
    ]
  },
  {
    label: '测试时间点',
    content: 'el-time-picker',
    required: true,
    prop: 'test7',
    attr: {
      'arrow-control': true,
      size: 'small'
    }
  },
  {
    label: '测试图片上传',
    content: 'ImageUpload',
    prop: 'test2',
    required: true,
    attr: {
      action: ''
    }
  }
]

export default formDemo
