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

const formDemo = {
  test1: {
    props: {
      label: '测试文本框',
      rules: [
        { required: true, message: '测试1不能为空' },
        { type: 'number', message: '测试1必须为数字' }
      ]
    },
    component: {
      name: 'el-input',
      attr: {
        size: 'small'
      }
    },
    linkage: (model: any) => {
      if (isNotEmptyString(model.test1)) {
        model.test1 = Number(model.test1.replace(/[^\d]/g, ''))
      }
    }
  },
  test9: {
    props: {
      label: '测试快捷时间范围',
      hide: true
    },
    component: {
      name: 'el-date-picker',
      attr: {
        type: 'datetimerange',
        shortcuts: getShortCuts(),
        rangeSeparator: '至',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        align: 'right',
        size: 'small'
      }
    }
  },
  test8: {
    props: {
      label: '测试时间范围'
    },
    component: {
      name: 'el-time-picker',
      attr: {
        'is-range': true,
        'arrow-control': true,
        'range-separator': '至',
        'start-placeholder': '开始时间',
        'end-placeholder': '结束时间',
        size: 'small'
      }
    },
    linkage: (model: any, schema: any) =>
      (schema.test9.props.hide = !!(Array.isArray(model.test8) && model.test8.length > 0))
  },
  test3: {
    props: {
      label: '测试单选框',
      required: true
    },
    component: {
      name: 'el-radio-group',
      attr: {},
      slots: [
        { slot: '是', label: true },
        { slot: '否', label: false }
      ]
    }
  },
  test4: {
    props: {
      label: '测试复选框',
      required: true
    },
    component: {
      name: 'el-checkbox-group',
      attr: {},
      slots: [
        { label: 'test1', slot: '测试1' },
        { label: 'test2', slot: '测试2' },
        { label: 'test3', slot: '测试3' }
      ]
    }
  },
  test5: {
    props: {
      label: '测试下拉单选',
      required: true
    },
    component: {
      name: 'el-select',
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
      ]
    },
    linkage: (model: any, schema: any) => {
      if (isNotEmptyString(model.test5)) {
        schema.test6.component.slots = [
          {
            label: '测试4',
            value: 'test4'
          }
        ]
      } else {
        schema.test6.component.slots = [
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
  test6: {
    props: {
      label: '测试下拉多选',
      required: true
    },
    component: {
      name: 'el-select',
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
    }
  },
  test7: {
    props: {
      label: '测试时间点',
      required: true
    },
    component: {
      name: 'el-time-picker',
      attr: {
        'arrow-control': true,
        size: 'small'
      }
    }
  },
  test2: {
    props: {
      label: '测试图片上传',
      required: true
    },
    component: {
      name: 'ImageUpload',
      attr: {
        action: ''
      }
    }
  }
}

export default formDemo
