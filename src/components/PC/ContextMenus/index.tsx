import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { ClickOutSide } from '@/utils/dom.ts'
import { isFunction } from '@/utils/types.ts'
import './style.less'
import { t } from '@/lang/index.ts'
const RightContextMenu = defineComponent({
    name: 'ContextMenu',
    componentName: "ManageContextMenu",
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        menus: {
            type: Array,
            default: () => []
        },
        left: [String, Number],
        top: [String, Number]
    },
    setup(props, { emit }: any) {
        const rightVisible = computed({
            get() {
                return props.visible
            },
            set(value) {
                emit('update:visible', value)
            }
        })
        let clickOut: any
        onMounted(() => {
            clickOut = new ClickOutSide()
            clickOut.on('.manage-right-menu', () => { rightVisible.value = false })
        })
        onBeforeUnmount(() => {
            clickOut.off()
            clickOut = null
        })
        return {
            rightVisible
        }
    },
    render() {
        return <section
            class="manage-right-menu"
            style={
                {
                    left: typeof this.left === 'number' ? `${this.left}px` : this.left,
                    top: typeof this.top === 'number' ? `${this.top}px` : this.top,
                    display: !this.visible ? 'none' : undefined
                }
            }
            onContextmenu={e => { e.stopPropagation(); e.preventDefault() }}
        >
            <ul>
                {this.menus.map((menu: any, index: number) => <li onClick={() => {
                    isFunction(menu.click) && menu.click()
                    this.rightVisible = false
                }}
                    key={index}
                >{t(menu.title)}</li>
                )}
            </ul>
        </section>
    }
})

export default RightContextMenu