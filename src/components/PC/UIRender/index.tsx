import { defineComponent, ref } from 'vue'
import UiRenderHead from './Head'
import UiRenderTool from './Tools'
import UiRenderContent from './Content'
import { getFile } from '@/utils/component.ts'
import './style.less'

const useHandleComponent = () => {
    const vueRenderStr = ref<any>([])
    const vueScriptStr = ref<any>({})
    const handleComponentClick = (key: string, component: any, ref: any) => {
        vueScriptStr.value[key] = getFile(key, component)
        vueRenderStr.value.push({
            component,
            prop: ref.$props,
            key,
            slots: ref.$slots,
            emits: component.__emits
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