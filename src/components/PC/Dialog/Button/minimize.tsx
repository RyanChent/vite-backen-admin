import { defineComponent, h } from 'vue'

const minimizeButton = defineComponent({
    name: 'MinimizeButton',
    componentName: 'ManageMinimizeButton',
    __file: '@PC/Dialog/Button/minimize.tsx',
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
        minimize: (minimize: any, maximize: any) => maximize instanceof Boolean && minimize instanceof Boolean
    },
    setup(props, { emit }: any) {
        return () => <button
            type="button"
            aria-label="Minimize"
            class="el-dialog__headerbtn"
            style="right: 70px"
            onClick={() => emit('minimize', !props.minimize, false)}
        >
            <i
                class="el-icon-minus el-icon"
                title="最小化"
                style="font-size: 14px"
            />
        </button>
    }
})

export default minimizeButton