import { defineComponent } from 'vue'
import './style.less'

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
                    return list.map(item => <item.component {...item.props}>
                        {Array.isArray(item.children) && handle(item.children)}
                    </item.component>)
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