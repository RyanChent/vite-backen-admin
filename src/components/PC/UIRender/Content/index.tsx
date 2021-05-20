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
                                default: () => <el-tabs stretch type="border-card">
                                    <el-tab-pane name="prop" label="组件配置">
                                        <el-form model={item.prop} label-width="100px">
                                            {Object.keys(item.prop).map(propKey => {
                                                let inputValue: any
                                                if (isPrimitiveType(item.prop[propKey]) || isFunction(item.prop[propKey])) {
                                                    inputValue = item.prop[propKey]
                                                } else {
                                                    inputValue = objectToString(item.prop[propKey])
                                                }
                                                return <el-form-item label={propKey}>
                                                    <el-input
                                                        type={isPrimitiveType(item.prop[propKey]) ? 'text' : 'textarea'}
                                                        v-model={inputValue}
                                                        placeholder={t('please.input.something') + propKey}
                                                    />
                                                </el-form-item>
                                            }
                                            )}
                                        </el-form>
                                    </el-tab-pane>
                                    <el-tab-pane name="slots" label="子组件">
                                        {isObject(item.slots) && Object.keys(item.slots).map(slotKey => <div>
                                            {slotKey}:
                                        </div>)}
                                    </el-tab-pane>
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