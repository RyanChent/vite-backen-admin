import { computed, defineComponent, h, onMounted, ref, resolveDirective } from 'vue'
import { isNotEmptyString, isFunction } from '@/utils/types'
import minimizeButton from './Button/minimize'
import maximizeButton from './Button/maximize'
import ElDialog from 'element-plus/lib/el-dialog'
import { pick } from '@/utils/props'
import './style.less'

const Dialogs = defineComponent({
  name: 'Dialogs',
  componentName: 'ManageDialogs',
  __file: '@PC/Dialog',
  __emits: {
    'update:modelValue': () => {}
  },
  components: {
    minimizeButton,
    maximizeButton,
    ElDialog
  },
  props: Object.assign({}, ElDialog.props, {
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
  setup(props, { slots, emit }: any) {
    const minimize = ref(false)
    const maximize = ref(false)
    const dialog = ref<any>(null)
    const customClass = isNotEmptyString(props.customClass) ? props.customClass + ' ' : ''
    /* 挂载默认的prop */
    const dialogProps = computed(() =>
      Object.assign(
        {},
        pick(props, Object.keys(ElDialog.props)),
        {
          customClass: `${customClass}animated ${
            !!props.modelValue ? props.enterTransition : props.fadeTransition
          }`,
          onClosed: () => {
            emit('update:modelValue', false)
          }
        },
        (props.showMinimize || props.showMaximize) && {
          'append-to-body': true,
          modalClass: `${!!maximize.value ? 'maximize ' : ' '}${
            !!minimize.value ? 'minimize ' : ' '
          }`
        }
      )
    )
    /* 挂载拖拽处理 */
    onMounted(() => {
      if (props.dragging) {
        const dragDialog: any = resolveDirective('el-drag-dialog')
        dragDialog.mounted(dialog.value.$refs.dialogRef)
      }
    })
    return () => (
      <el-dialog {...dialogProps.value} ref={dialog}>
        {Object.assign(
          {
            title: () => (
              <>
                {isFunction(slots.title) ? (
                  slots.title(dialogProps.value.title)
                ) : (
                  <span class="dialogs-title">{dialogProps.value.title}</span>
                )}
                {props.showMinimize && (
                  <minimizeButton
                    minimize={minimize.value}
                    maximize={maximize.value}
                    onMinimize={(min: any, max: any) => {
                      minimize.value = min
                      maximize.value = max
                    }}
                  />
                )}
                {props.showMaximize && (
                  <maximizeButton
                    maximize={maximize.value}
                    minimize={minimize.value}
                    onMaximize={(max: any, min: any) => {
                      maximize.value = max
                      minimize.value = min
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
      </el-dialog>
    )
  }
})

export default Dialogs
