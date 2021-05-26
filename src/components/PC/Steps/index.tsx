import { defineComponent } from 'vue'
import ElSteps from 'element-plus/lib/el-steps'
import { isFunction, isNotEmptyString } from '@/utils/types'
import { useStepProps, useHandleStep, noop } from '@/hooks/steps'
import './style'

const Steps = defineComponent({
    name: 'Steps',
    componentName: 'ManageStepsPage',
    __file: '@PC/Steps',
    props: Object.assign({}, ElSteps.props, {
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
    setup(props, { emit }: any) {
        const { stepsProps, activeIndex, carousel } = useStepProps(props, emit, ElSteps)
        const { nextStep, prevStep, confirmStep } = useHandleStep(props, activeIndex, carousel)
        return {
            stepsProps,
            activeIndex,
            carousel,
            nextStep,
            prevStep,
            confirmStep
        }
    },
    render() {
        const slots: any = this.$slots
        return <section class="manage-pc-steps-page">
            <header>
                <el-steps {...this.stepsProps} active={this.activeIndex}>
                    {this.steps.map((step: any, index: number) =>
                        <el-step
                            {...Object.assign({
                                key: index,
                                onClick: () => {
                                    this.activeIndex = index
                                    this.carousel?.setActiveItem && this.carousel.setActiveItem(index)
                                    isFunction(step.click) && step.click()
                                }
                            }, isNotEmptyString(step.status) && {
                                status: step.status,
                            })}
                        >
                            {
                                Object.assign({}, step.title && {
                                    title: () => isFunction(step.title) ? step.title() : <span v-html={step.title} />
                                }, step.icon && {
                                    icon: () => isFunction(step.icon) ? step.icon() : <i class={step.icon} />
                                }, step.description && {
                                    description: () => isFunction(step.description) ? step.description() : <span v-html={step.description} />
                                })
                            }
                        </el-step>
                    )}
                </el-steps>
            </header>
            <main class="manage-pc-steps-content">
                <el-carousel
                    autoplay={false}
                    initial-index={this.activeIndex}
                    arrow="never"
                    indicator-position="none"
                    height='calc(100vh - 450px)'
                    ref={(el: any) => this.carousel = el}
                >
                    {this.steps.map((item: undefined, index: number) =>
                        <el-carousel-item key={index}>
                            {isFunction(slots[`step${index}`]) && slots[`step${index}`]()}
                        </el-carousel-item>
                    )}
                </el-carousel>
            </main>
            <footer class="manage-pc-steps-footer">
                {this.activeIndex > 0 &&
                    <el-button
                        size="small"
                        type="primary"
                        onClick={this.prevStep}
                        plain
                    >
                        上一步
                        </el-button>}
                {this.activeIndex === this.steps.length - 1 &&
                    <el-button
                        type="success"
                        size="small"
                        onClick={this.confirmStep}
                        plain
                    >确定
                    </el-button>}
                {this.activeIndex < this.steps.length - 1 &&
                    <el-button
                        size="small"
                        type="primary"
                        plain
                        onClick={this.nextStep}
                    >
                        下一步
                        </el-button>}
            </footer>
        </section>
    }
})

export default Steps