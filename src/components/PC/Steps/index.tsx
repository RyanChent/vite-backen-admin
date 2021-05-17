import { computed, defineComponent, TransitionGroup } from 'vue'
import './style.less'
import ElSteps from 'element-plus/lib/el-steps'
import { isFunction, isNotEmptyString } from '@/utils/types.ts'
import _ from 'lodash'

const useProps = (props: any, emit: any) => {
    const stepsProps = computed(() => Object.assign({},
        _.pick(props, Object.keys(ElSteps.props).filter(key => key !== 'active')),
        { direction: 'horizontal' }
    ))
    const activeIndex = computed<any>({
        get() {
            return props.active
        },
        set(value) {
            emit('update:active', value)
        }
    })
    return {
        stepsProps,
        activeIndex
    }
}

const noop = () => () => { }

const Steps = defineComponent({
    name: 'Steps',
    componentName: 'ManageStepsPage',
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
        const { stepsProps, activeIndex } = useProps(props, emit)
        return {
            stepsProps,
            activeIndex,
        }
    },
    render() {
        const slots: any = this.$slots
        return <section class="manage-pc-steps-page">
            <header>
                <el-steps {...this.stepsProps} active={this.active}>
                    {this.steps.map((step: any, index: number) =>
                        <el-step
                            {...Object.assign({
                                key: index,
                                onClick: () => {
                                    this.activeIndex = index
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
                <TransitionGroup enterActiveClass="animated fadeIn">
                    {isFunction(slots.default) && slots.default()}
                </TransitionGroup>
            </main>
            <footer class="manage-pc-steps-footer">
                {this.activeIndex > 0 &&
                    <el-button
                        size="small"
                        type="primary"
                        onClick={() => {
                            this.activeIndex = Math.max(0, this.activeIndex - 1)
                            isFunction(this.prev) && this.prev()
                        }}>上一步</el-button>}
                {this.activeIndex === this.steps.length - 1 &&
                    <el-button
                        type="success"
                        size="small"
                        onClick={() => {
                            isFunction(this.confirm) && this.confirm()
                        }}>确定</el-button>}
                {this.activeIndex < this.steps.length - 1 &&
                    <el-button
                        size="small"
                        type="primary"
                        onClick={() => {
                            this.activeIndex = Math.min(this.steps.length, this.activeIndex + 1)
                            isFunction(this.next) && this.next()
                        }}>下一步</el-button>}
            </footer>
        </section>
    }
})

export default Steps