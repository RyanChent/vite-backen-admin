import { defineComponent } from 'vue'
import { isObject, isFunction } from '@/utils/types.ts'
import './style.less'

const UIRenderContent = defineComponent({
    name: 'UIRenderContent',
    componentsName: 'ManageUIRenderContent',
    props: {
        renderStr: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        const handleComponent = () => {
            const handle = (list: any) => {
                if (Array.isArray(list)) {
                    return list.map(item => <item.component {...item.prop}>
                        {
                            isObject(item.slots) && Object.entries(item.slots).reduce((self: any, [slotKey, slotValue]: any) => {
                                if (isFunction(slotValue)) {
                                    self[slotKey] = slotValue
                                } else if (isObject(slotValue)) {
                                    self[slotKey] = handle(Object.values(slotValue))
                                }
                                return self
                            }, {})
                        }
                    </item.component>)
                }
                return list
            }
            return handle(props.renderStr)
        }
        return {
            handleComponent
        }
    },
    render() {
        return <section
            class="ui-render-content"
            onContextmenu={(e: MouseEvent) => {
                e.stopPropagation()
                e.preventDefault()
            }}>
            <div class="render-panel" >
                {this.handleComponent()}
            </div>
        </section>
    }
})

export default UIRenderContent