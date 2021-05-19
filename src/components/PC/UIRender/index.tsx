import { defineComponent, ref } from 'vue'
import UiRenderHead from './Head'
import UiRenderTool from './Tools'
import UiRenderContent from './Content'
import { objectToString } from '@/utils/data.ts'
import './style.less'

const UIRender = defineComponent({
    name: 'UIRender',
    componentName: 'ManageUIRender',
    components: {
        UiRenderHead,
        UiRenderTool,
        UiRenderContent
    },
    setup() {
        const vueRenderStr = ref<any>([])
        const vueScriptStr = ref<any>({})
        const handleComponentClick = (key: string, component: any, prop: any) => {
            vueScriptStr.value[key] = component.file || '@/components'
            vueRenderStr.value.push({
                component,
                prop,
                source: `<${key} v-bind="${objectToString(prop)}">slots</${key}>`
            })
        }
        return {
            vueRenderStr,
            vueScriptStr,
            handleComponentClick
        }
    },
    render() {
        return <section class="manage-ui-render-page">
            <div class="ui-render-show">
                <ui-render-head renderStr={this.vueRenderStr} importStr={Object.entries(this.vueScriptStr).map(([key, value]: any) => `import ${key} from '${value}'`)} />
                <ui-render-content renderStr={this.vueRenderStr} />
            </div>
            <div class="ui-render-right-tools">
                <ui-render-tool onRender={this.handleComponentClick} />
            </div>
        </section>
    }
})

export default UIRender