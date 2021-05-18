import { defineComponent, h } from 'vue'

const maximizeButton = defineComponent({
    name: 'MaximizeButton',
    componentName: 'ManageMaximizeButton',
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
    emits: {
        maximize: (maximize: any, minimize: any) => maximize instanceof Boolean && minimize instanceof Boolean
    },
    setup(props, { emit }: any) {
        return () => <button
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
    }
})

export default maximizeButton