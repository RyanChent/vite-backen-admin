import { defineComponent, ref } from 'vue'
import { isObject, isFunction, isPrimitiveType, trueType } from '@/utils/types.ts'
import './style.less'
import { t } from '@/lang/index.ts'
import RightContextMenu from '@PC/ContextMenus/index.tsx'

const componentType = (prop: any, propKey: any): any => {
    switch (trueType(prop[propKey])) {
        case 'String':
        case 'Number':
        case 'Symbol':
            return <el-input
                v-model={prop[propKey]}
                clearable
                placeholder={t('please.input.something')}
            />
        case 'Boolean':
            return <>
                <el-radio v-model={prop[propKey]} label={true}>{t('true')}</el-radio>
                <el-radio v-model={prop[propKey]} label={false}>{t('false')}</el-radio>
            </>
        case 'Array':
            return prop[propKey].map(componentType)
        case 'Function':
            return <el-input
                type="textarea"
                v-model={prop[propKey]}
                autosize={{
                    minRows: 6,
                    maxRows: 10
                }}
                clearable
                placeholder={t('please.input.something')}
            />
        case 'Object':
            return Object.keys(prop[propKey]).map(key => componentType(prop[propKey], key))
        default:
            return null
    }
}

const popoverDefault = (item: any) => <el-tabs type="border-card" v-model={item.tab}>
    <el-tab-pane name="prop" label="组件配置">
        {
            Object.keys(item.prop).map((propKey: any) => <div class="input-row">
                <span title={t(propKey)} class="prop-key">{t(propKey)}</span>
                {componentType(item.prop, propKey)}
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


const useHandleComponent = (props: any) => {
    const top = ref<any>(0)
    const left = ref<any>(0)
    const visible = ref<any>(false)
    const current = ref<any>('')
    const rightMenus = [
        {
            title: 'remove component',
            click: () => {
                removeComponent(props.renderStr, current.value)
            }
        }
    ]
    const removeComponent = (data: any, id: string) => {
        if (Array.isArray(data)) {
            const index = data.findIndex((item: any) => item.id === id)
            if (index > -1) {
                data.splice(index, 1)
            }
        }
    }
    const renderComponent = () => {
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
                            reference: () => <div style="width: fit-content;"
                                onContextmenu={(e: MouseEvent) => {
                                    const { clientX, clientY } = e
                                    top.value = clientY
                                    left.value = clientX
                                    visible.value = true
                                    current.value = item.id
                                }}
                            >
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
                            default: () => popoverDefault(item)
                        }}
                    </el-popover >
                )
            }
            return list
        }
        return handle(props.renderStr)
    }

    return {
        renderComponent,
        removeComponent,
        rightMenus,
        top,
        left,
        visible,
        current
    }
}

const UIRenderContent = defineComponent({
    name: 'UIRenderContent',
    componentsName: 'ManageUIRenderContent',
    components: {
        RightContextMenu
    },
    props: {
        renderStr: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        const { renderComponent, rightMenus, top, left, visible, current } = useHandleComponent(props)
        return {
            renderComponent,
            rightMenus,
            top,
            left,
            visible,
            current
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
                {this.renderComponent()}
            </div>
            <right-context-menu
                v-model={[this.visible, 'visible']}
                {...{
                    top: this.top,
                    left: this.left,
                    menus: this.rightMenus
                }}
            />
        </section>
    }
})

export default UIRenderContent