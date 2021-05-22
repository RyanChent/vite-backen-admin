import { defineComponent, markRaw, ref, shallowReactive, toRaw } from 'vue'
import UiRenderHead from './Head'
import UiRenderTool from './Tools'
import UiRenderContent from './Content'
import { getFile } from '@/utils/component.ts'
import { uuid } from '@/utils/tool.ts'
import './style.less'

const useHandleComponent = () => {
    const vueRenderStr = ref<any>([])
    const vueScriptStr = ref<any>({})
    const handleComponentClick = (key: string, component: any, cref: any) => {
        vueScriptStr.value[key] = getFile(key, component)
        vueRenderStr.value.push({
            component: markRaw(component),
            prop: shallowReactive(toRaw(cref.$props)),
            key,
            slots: shallowReactive(toRaw(cref.$slots)),
            emits: component.__emits,
            tab: 'prop',
            id: uuid()
        })
    }

    return {
        vueRenderStr,
        vueScriptStr,
        handleComponentClick
    }
}

const UIRender = defineComponent({
    name: 'UIRender',
    componentName: 'ManageUIRender',
    components: {
        UiRenderHead,
        UiRenderTool,
        UiRenderContent
    },
    setup() {
        const { vueRenderStr, vueScriptStr, handleComponentClick } = useHandleComponent()
        return {
            vueRenderStr,
            vueScriptStr,
            handleComponentClick
        }
    },
    render() {
        return <section class="manage-ui-render-page">
            <div class="ui-render-show">
                <ui-render-head
                    renderStr={this.vueRenderStr}
                    importStr={Object.values(this.vueScriptStr)}
                    onReset={() => {
                        this.vueRenderStr = []
                        this.vueScriptStr = {}
                    }}
                />
                <ui-render-content renderStr={this.vueRenderStr} />
            </div>
            <div class="ui-render-right-tools">
                <ui-render-tool onRender={this.handleComponentClick} />
            </div>
        </section>
    }
})

export default UIRender