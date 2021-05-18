import { defineComponent } from 'vue'
import UiRenderHead from './Head'
import UiRenderTool from './Tools'
import UiRenderContent from './Content'
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
        return {

        }
    },
    render() {
        return <section class="manage-ui-render-page">
            <div class="ui-render-show">
                <ui-render-head />
                <ui-render-content />
            </div>
            <div class="ui-render-right-tools">
                <ui-render-tool />
            </div>
        </section>
    }
})

export default UIRender