import { defineComponent, computed, ref } from 'vue'
import { pick } from '@/utils/props.ts'
import { Steps, Step } from 'vant'
import './style.less'

const noop = () => () => { }

const useStepProps = (props: any, emit: any) => {
    const stepsProps = computed(() => Object.assign({},
        pick(props, Object.keys((Steps as any).props).filter(key => key !== 'active')),
        {
            direction: 'horizontal'
        }
    ))
    const activeIndex = computed<any>({
        get() {
            return props.active
        },
        set(value) {
            emit('update:active', value)
        }
    })
    const carousel = ref<any>(null)
    return {
        stepsProps,
        activeIndex,
        carousel
    }
}

const MobileSteps = defineComponent({
    name: 'MobileSteps',
    componentName: 'ManageMobileSteps',
    components: {
        Steps,
        Step
    },
    props: Object.assign({}, (Steps as any).props, {
        steps: {
            type: Array,
            default: () => []
        },
        next: {
            type: Function,
            default: noop
        },
        prev: {
            type: Function,
            default: noop
        },
        confirm: {
            type: Function,
            default: noop
        }
    }),
    setup() {
        return {

        }
    },
    render() {
        return <div>123</div>
    }
})

export default MobileSteps
