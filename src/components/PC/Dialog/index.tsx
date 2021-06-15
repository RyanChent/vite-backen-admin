import { defineComponent, onMounted, resolveDirective } from 'vue'
import { isFunction } from '@/utils/types'
import minimizeButton from './Button/minimize'
import maximizeButton from './Button/maximize'
import Dialog from 'element-plus/lib/el-dialog'
import { useDialogProps } from '@/hooks/dialog'
import './style'

const Dialogs = defineComponent({
  name: 'Dialogs',
  componentName: 'ManageDialogs',
  __file: '@PC/Dialog',
  emits: ['update:modelValue'],
  components: {
    minimizeButton,
    maximizeButton,
    Dialog
  },
  props: Object.assign({}, Dialog.props, {
    showMinimize: {
      type: Boolean,
      default: false
    },
    showMaximize: {
      type: Boolean,
      default: false
    },
    enterTransition: {
      type: String,
      default: 'zoomIn'
    },
    fadeTransition: {
      type: String,
      default: 'zoomOut'
    },
    dragging: {
      type: Boolean,
      default: false
    }
  }),
  setup(props, { emit }: any) {
    const { minimize, maximize, dialog, dialogProps } = useDialogProps(props, emit, Dialog)
    /* 挂载拖拽处理 */
    onMounted(() => {
      if (props.dragging) {
        const dragDialog: any = resolveDirective('el-drag-dialog')
        dragDialog.mounted(dialog.value.$refs.dialogRef)
      }
    })
    return {
      minimize,
      maximize,
      dialog,
      dialogProps
    }
  },
  render() {
    const slots: any = this.$slots
    return (
      <Dialog {...this.dialogProps} ref={(el: any) => el && (this.dialog = el)}>
        {Object.assign(
          {
            title: () => (
              <>
                {isFunction(slots.title) ? (
                  slots.title(this.dialogProps.title)
                ) : (
                  <span class="dialogs-title">{this.dialogProps.title}</span>
                )}
                {this.showMinimize && (
                  <minimizeButton
                    minimize={this.minimize}
                    maximize={this.maximize}
                    onMinimize={(min: any, max: any) => {
                      this.minimize = min
                      this.maximize = max
                    }}
                  />
                )}
                {this.showMaximize && (
                  <maximizeButton
                    maximize={this.maximize}
                    minimize={this.minimize}
                    onMaximize={(max: any, min: any) => {
                      this.maximize = max
                      this.minimize = min
                    }}
                  />
                )}
              </>
            ),
            default: (prop: unknown) => isFunction(slots.default) && slots.default(prop)
          },
          isFunction(slots.footer) && {
            footer: (prop: unknown) => slots.footer(prop)
          }
        )}
      </Dialog>
    )
  }
})

export default Dialogs
