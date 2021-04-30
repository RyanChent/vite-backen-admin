import './style.less'
import { computed, defineComponent, ref, watch } from 'vue'
import { isFunction } from '@/utils/types.ts'
import { useRoute } from 'vue-router'

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
        const route = useRoute()
        const current = ref<any>(route.path)
        const showLeft = computed({
            get() {
                return props.modelValue
            },
            set(value) {
                emit('update:modelValue', value)
            }
        })
        watch(() => route.path, () => {
            current.value = route.path
        })
        return {
            showLeft,
            current
        }
    },
    render() {
        const slots = this.$slots as any
        return <van-nav-bar title={this.title} onClickLeft={() => this.showLeft = true} safe-area-inset-top>
            {Object.assign({},
                this.current !== '/me' && {
                    left: () => <><van-icon name="apps-o" />
                        <span>菜单</span>
                    </>,
                    right: () => isFunction(slots.rightNav) && slots.rightNav()
                })
            }
        </van-nav-bar>
    }
})

export default globalHeader