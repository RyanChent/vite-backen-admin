import { defineComponent } from 'vue'
import './style.less'

const UIRenderContent = defineComponent({
    name: 'UIRenderContent',
    componentsName: 'ManageUIRenderContent',
    props: {
        componentList: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        return {

        }
    },
    render() {
        return <section
            class="ui-render-content"
            onContextmenu={(e: MouseEvent) => {
                e.stopPropagation()
                e.preventDefault()
            }}>
            <div class="render-panel" />
        </section>
    }
})

export default UIRenderContent