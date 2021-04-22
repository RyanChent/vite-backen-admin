import { computed, defineComponent, h, ref } from 'vue'
import { isNotEmptyString, isFunction } from '@/utils/types'
import './style.less'
import minimizeButton from './Button/minimize'
import maximizeButton from './Button/maximize'

const Dialogs = defineComponent({
    name: 'Dialogs',
    componentName: 'ManageDialogs',
    components: {
        minimizeButton,
        maximizeButton
    },
    props: {
        ElDialogProps: {
            type: Object,
            default: () => ({})
        },
        showMinimize: {
            type: Boolean,
            default: false
        },
        showMaximize: {
            type: Boolean,
            default: false
        }
    },
    emits: {
        closed: (visible: any) => visible instanceof Boolean
    },
    setup(props, { slots, emit }: any) {
        let minimize: any, maximize: any
        props.showMinimize && (minimize = ref(false))
        props.showMaximize && (maximize = ref(false))
        const dialogProps = computed(() => Object.assign({}, {
            title: '测试弹窗',
            'close-on-click-modal': false,
            'close-on-press-escape': false,
            'destroy-on-close': true,
            width: '50%',
            modal: true,
            'model-value': false,
        }, props.ElDialogProps, {
            'custom-class': `${isNotEmptyString(props.ElDialogProps['custom-class']) ? props.ElDialogProps['custom-class'].replace(/./g, '') + ' ' : ''}animated ${props.ElDialogProps['model-value'] ? 'zoomIn' : 'zoomOut'}`,
            onClosed: () => {
                emit('closed', false)
            },
        }, (props.showMinimize || props.showMaximize) && {
            modalClass: `${!!maximize.value ? 'maximize ' : ' '}${!!minimize.value ? 'minimize ' : ' '}`
        }))
        return () => <el-dialog {...dialogProps.value}>
            {
                Object.assign({
                    title: () => <>
                        {isFunction(slots.title) ? slots.title(dialogProps.value.title) : <span class="dialogs-title">{dialogProps.value.title}</span>}
                        {props.showMinimize && <minimizeButton
                            minimize={minimize.value}
                            maximize={maximize.value}
                            onMinimize={(min: any, max: any) => {
                                minimize.value = min
                                maximize.value = max
                            }}
                        />}
                        {props.showMaximize && <maximizeButton
                            maximize={maximize.value}
                            minimize={minimize.value}
                            onMaximize={(max: any, min: any) => {
                                maximize.value = max
                                minimize.value = min
                            }}
                        />}
                    </>,
                    default: () => isFunction(slots.default) && slots.default(),
                }, isFunction(slots.footer) && {
                    footer: () => slots.footer()
                })
            }
        </el-dialog>
    },
})

export default Dialogs
