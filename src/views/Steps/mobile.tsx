import { defineComponent, computed, resolveComponent } from 'vue'

const MobileSteps = defineComponent({
    name: 'MobileStepsPage',
    componentName: "ManageMobileSteps",
    props: {
        modelValue: {
            type: Number,
            default: 0
        },
        steps: {
            type: Array,
            default: () => []
        }
    },
    setup(props, { emit }: any) {
        const active = computed({
            get() {
                return props.modelValue
            },
            set(value) {
                emit('update:modelValue', value)
            }
        })
        return {
            active
        }
    },
    render() {
        const MobileSteps: any = resolveComponent('MobileSteps')
        return <MobileSteps />
    }
})

export default MobileSteps