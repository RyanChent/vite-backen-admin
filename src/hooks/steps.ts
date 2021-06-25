import { computed, ref, watch } from 'vue'
import { pick } from '@/utils/props'
import { isFunction } from '@/utils/types'
import { buttonBlur } from '@/utils/dom'

export const noop = () => () => {}

export const useStepProps = (props: any, emit: any, component: any) => {
  const stepsProps = computed(() => {
    return Object.assign(
      {},
      pick(
        props,
        Object.keys(component.props).filter((key) => key !== 'active')
      ),
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
  watch(
    () => activeIndex.value,
    () => {
      if (!props.showFooter) {
        if (carousel.value) {
          carousel.value.setActiveItem?.(activeIndex.value)
          carousel.value.swipeTo?.(activeIndex.value)
        }
      }
    }
  )
  return {
    stepsProps,
    activeIndex,
    carousel
  }
}

export const useHandleStep = (props: any, activeIndex: any, carousel: any) => {
  const prevStep = (e: MouseEvent | TouchEvent) => {
    if (activeIndex.value > 0) {
      activeIndex.value -= 1
      carousel.value?.prev && carousel.value.prev()
    }
    isFunction(props.prev) && props.prev()
    buttonBlur(e)
  }

  const confirmStep = (e: MouseEvent | TouchEvent) => {
    isFunction(props.confirm) && props.confirm()
    buttonBlur(e)
  }

  const nextStep = (e: MouseEvent | TouchEvent) => {
    if (activeIndex.value < props.steps.length) {
      activeIndex.value += 1
      carousel.value?.next && carousel.value.next()
    }
    isFunction(props.next) && props.next()
    buttonBlur(e)
  }

  return {
    prevStep,
    confirmStep,
    nextStep
  }
}
