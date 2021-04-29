import './style.less'
import { computed, defineComponent } from 'vue'
import { isFunction } from '@/utils/types.ts'

const globalHeader = defineComponent({
    name: 'mobileHeader',
    componentName: 'ManageMobileHeader',
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit }: any) {
        const showLeft = computed({
            get() {
                return props.modelValue
            },
            set(value) {
                emit('update:modelValue', value)
            }
        })
        return {
            showLeft
        }
    },
    render() {
        const slots = this.$slots as any
        return <van-nav-bar title={this.title} onClickLeft={() => this.showLeft = true} safe-area-inset-top>
            {{
                left: () => <><van-icon name={this.showLeft ? 'arrow-left' : 'arrow'} />
                    <span>{this.showLeft ? '折叠' : '展开'}</span>
                </>,
                right: () => isFunction(slots.rightNav) ? slots.rightNav() : <div>123</div>
            }}
        </van-nav-bar>
    }
})

export default globalHeader