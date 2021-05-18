import { defineComponent, resolveComponent, ref } from 'vue'

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
        const Editor = resolveComponent('Editor') as any
        return <Editor v-model={this.content} />
    }
})

export default EditorPage