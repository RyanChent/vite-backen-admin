import { defineComponent, ref } from 'vue'
import UiRenderHead from './Head'
import UiRenderTool from './Tools'
import UiRenderContent from './Content'
import { objectToString } from '@/utils/data.ts'
import './style.less'

const useHandleComponent = () => {
    const vueRenderStr = ref<any>([])
    const vueScriptStr = ref<any>({})
    const getSource = (key: string, prop: any): string => {
        let source = `<${key}`
        const bindValue = objectToString(prop)
        if (prop.hasOwnProperty('modelValue')) {
            source += ` v-model="modelValue"`
        }
        if (Object.keys(prop).length > 0) {
            source += ` v-bind="${bindValue}"`
        }
        source += `>slots</${key}>`
        return source
    }
    const getFile = (key: string, component: any): string => {
        if (!component.__file) {
            return `import ${key} from '@/components'`
        } else {
            if (key.toLowerCase().startsWith('el')) {
                return `import {${key}} from 'element-plus'`
            }
            if (key.toLowerCase().startsWith('van')) {
                return `import {${key}} from 'vant'`
            }
            return `import ${key} from '${component.__file}'`
        }
    }
    const handleComponentClick = (key: string, component: any, prop: any) => {
        vueScriptStr.value[key] = getFile(key, component)
        vueRenderStr.value.push({
            component,
            prop,
            source: getSource(key, prop)
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