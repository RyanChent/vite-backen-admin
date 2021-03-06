import { defineComponent } from 'vue'

const maximizeButton = defineComponent({
  name: 'MaximizeButton',
  componentName: 'ManageMaximizeButton',
  __file: '@PC/Dialog/Button/maximize',
  emits: ['maximize'],
  props: {
    maximize: {
      type: Boolean,
      default: false
    },
    minimize: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }: any) {
    return () => (
      <button
        type="button"
        aria-label={props.maximize ? 'Resize' : 'Maximize'}
        class={{
          'el-dialog__headerbtn': true
        }}
        style="right: 45px"
        onClick={() => emit('maximize', !props.maximize, false)}
      >
        <i
          class={{
            'el-icon': true,
            'el-icon-full-screen': !props.maximize,
            'el-icon-copy-document': props.maximize
          }}
          title={props.maximize ? '还原' : '最大化'}
          style="font-size: 14px"
        />
      </button>
    )
  }
})

export default maximizeButton
