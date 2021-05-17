import { computed, defineComponent } from 'vue'
import './style.less'
import ElSteps from 'element-plus/lib/el-steps'
import { isFunction, isNotEmptyString } from '@/utils/types.ts'
import _ from 'lodash'

const useProps = (props: any, emit: any) => {
    const stepsProps = computed(() => Object.assign({}, _.pick(props, Object.keys(ElSteps.props).filter(key => key !== 'active'))))
    const active = computed<any>({
        get() {
            return props.active
        },
        set(value) {
            emit('update:active', value)
        }
    })
    return {
        stepsProps,
        active
    }
}

const Steps = defineComponent({
    name: 'Steps',
    componentName: 'ManageStepsPage',
    props: Object.assign({}, ElSteps.props, {
        steps: {
            type: Array,
            default: () => []
        }
    }),
    setup(props, { emit }: any) {
        const { stepsProps, active } = useProps(props, emit)
        return {
            stepsProps,
            active
        }
    },
    render() {
        return <section class="manage-pc-steps-page">
            <header>
                <el-steps {...this.stepsProps} active={this.active}>
                    {this.steps.map((step: any, index: number) =>
                        <el-step
                            {...Object.assign({
                                key: index
                            }, isNotEmptyString(step.status) && {
                                status: step.status
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
            <main>

            </main>
        </section>
    }
})

export default Steps