import { defineComponent, resolveComponent, ref } from 'vue'
import './style'
const EditorPage = defineComponent({
    name: 'EditorPage',
    componentName: 'ManageEditorPage',
    setup() {
        const content = ref<any>('')
        return {
            content
        }
    },
    render() {
        const Editor: any = resolveComponent('Editor')
        return <Editor v-model={this.content} />
    }
})

export default EditorPage