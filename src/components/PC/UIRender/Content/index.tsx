import { defineComponent } from 'vue'
import { isObject, isFunction, isPrimitiveType } from '@/utils/types.ts'
import { objectToString } from '@/utils/data.ts'
import './style.less'
import { t } from '@/lang/index.ts'

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
                    return list.map(item =>
                        <el-popover
                            trigger="click"
                            placement="right-start"
                            title={t(item.key)}
                            popper-class="component-config-popover"
                        >
                            {{
                                reference: () => <div style="width: fit-content;">
                                    <item.component {...item.prop} style="pointer-events: none">
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
                                    </item.component>
                                </div>,
                                default: () => <el-tabs type="border-card" v-model={item.tab}>
                                    <el-tab-pane name="prop" label="组件配置">
                                        {
                                            Object.entries(item.prop).map(([propKey, propValue]: any) =>
                                                isPrimitiveType(propValue) && <div class="input-row">
                                                    <span>{propKey}</span>
                                                    <el-input v-model={propValue} onChange={console.log} />
                                                </div>
                                            )
                                        }
                                    </el-tab-pane>
                                    {isObject(item.slots) && Object.keys(item.slots).length > 0 &&
                                        <el-tab-pane name="slots" label="子组件">
                                            <div>子组件</div>
                                        </el-tab-pane>
                                    }
                                </el-tabs>
                            }}
                        </el-popover>
                    )
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