import { defineComponent } from 'vue'
import { noop, useStepProps, useHandleStep } from '@/hooks/steps'
import { Steps, Step } from 'vant'
import { isFunction } from '@/utils/types'
import './style'

const MobileSteps = defineComponent({
  name: 'MobileSteps',
  componentName: 'ManageMobileSteps',
  __file: '@Mobile/Steps',
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
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    permitClick: {
      type: Boolean,
      default: true
    }
  }),
  setup(props, { emit }: any) {
    const { stepsProps, activeIndex, carousel } = useStepProps(props, emit, Steps)
    const { prevStep, confirmStep, nextStep } = useHandleStep(props, activeIndex, carousel)
    return {
      stepsProps,
      activeIndex,
      carousel,
      prevStep,
      confirmStep,
      nextStep
    }
  },
  render() {
    const slots: any = this.$slots
    return (
      <section class="manage-mobile-steps-page">
        <header>
          <Steps
            {...this.stepsProps}
            active={this.activeIndex}
            onClickStep={(index: number) => {
              if (this.permitClick) {
                if (this.carousel) {
                  this.carousel.swipeTo(index)
                  this.carousel.resize()
                }
                this.activeIndex = index
              }
            }}
          >
            {(this as any).steps.map((step: any, index: number) => (
              <Step>
                {Object.assign(
                  {},
                  {
                    default: () =>
                      isFunction(step.title) ? step.title(step) : <p v-html={step.title} />
                  },
                  step.icon && {
                    'active-icon': () =>
                      isFunction(step.icon) ? step.icon(step) : <i class={step.icon} />,
                    'inactive-icon': () =>
                      isFunction(step.icon) ? step.icon(step) : <i class={step.icon} />
                  }
                )}
              </Step>
            ))}
          </Steps>
        </header>
        <main class="manage-mobile-steps-content">
          <van-swipe
            show-indicators={false}
            lazy-render
            touchable={false}
            onChange={(index: number) => (this.activeIndex = index)}
            loop={false}
            ref={(el: any) => el && (this.carousel = el)}
          >
            {(this as any).steps.map((item: undefined, index: number) => (
              <van-swipe-item>
                {isFunction(slots[`step${index}`]) && slots[`step${index}`]()}
              </van-swipe-item>
            ))}
          </van-swipe>
        </main>
        {this.showFooter && (
          <footer class="manage-mobile-steps-footer">
            {this.activeIndex > 0 && (
              <van-button type="primary" plain hairline size="small" onTouchstart={this.prevStep}>
                上一步
              </van-button>
            )}
            {this.activeIndex === (this as any).steps.length - 1 && (
              <van-button
                type="success"
                plain
                hairline
                size="small"
                onTouchstart={this.confirmStep}
              >
                确定
              </van-button>
            )}
            {this.activeIndex < (this as any).steps.length - 1 && (
              <van-button type="primary" plain hairline size="small" onTouchstart={this.nextStep}>
                下一步
              </van-button>
            )}
          </footer>
        )}
      </section>
    )
  }
})

export default MobileSteps
