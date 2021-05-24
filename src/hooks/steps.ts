import { computed, ref } from 'vue'
import { pick } from '@/utils/props.ts'
import { isFunction } from '@/utils/types.ts'

export const noop = () => () => { }

export const useStepProps = (props: any, emit: any, component: any) => {
    const stepsProps = computed(() => {
        return Object.assign(
            {},
            pick(props, Object.keys(component.props).filter(key => key !== 'active')),
            {
                direction: 'horizontal'
            }
        )
    })

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

export const useHandleStep = (props: any, activeIndex: any, carousel: any) => {
    const prevStep = () => {
        if (activeIndex.value > 0) {
            activeIndex.value -= 1
            carousel.value?.prev && carousel.value.prev()
        }
        isFunction(props.prev) && props.prev()
    }

    const confirmStep = () => {
        isFunction(props.confirm) && props.confirm()
    }

    const nextStep = () => {
        if (activeIndex.value < props.steps.length) {
            activeIndex.value += 1
            carousel.value?.next && carousel.value.next()
        }
        isFunction(props.next) && props.next()
    }

    return {
        prevStep,
        confirmStep,
        nextStep
    }
}