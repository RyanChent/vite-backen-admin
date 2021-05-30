import { defineComponent, markRaw, reactive, ref, toRaw } from 'vue'
import UiRenderHead from './Head'
import UiRenderTool from './Tools'
import UiRenderContent from './Content'
import UiRenderTree from './Node'
import { getFile } from '@/utils/component'
import { deepClone } from '@/utils/data'
import { uuid } from '@/utils/tool'
import './style'

const useHandleComponent = () => {
    const vueRenderStr = ref<any>([])
    const vueScriptStr = ref<any>({})
    const handleComponentClick = (key: string, component: any, cref: any) => {
        vueScriptStr.value[key] = getFile(key, component)
        vueRenderStr.value.push({
            component: markRaw(component),
            prop: reactive(deepClone(toRaw(cref.$props))),
            key,
            slots: reactive(deepClone(toRaw(cref.$slots))),
            emits: reactive(deepClone(toRaw(component.__emits))),
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
        UiRenderContent,
        UiRenderTree
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
            <div class="ui-render-tree">
                <ui-render-tree renderStr={this.vueRenderStr} />
            </div>
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