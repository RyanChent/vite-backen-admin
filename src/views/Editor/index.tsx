import { defineComponent, ref, KeepAlive } from 'vue'
import Editor from '@PC/Editor'
import './style'
const EditorPage = defineComponent({
  name: 'EditorPage',
  componentName: 'ManageEditorPage',
  components: {
    Editor: defineComponent(Editor)
  },
  setup() {
    const content = ref<any>('')
    return {
      content
    }
  },
  render() {
    return (
      <KeepAlive>
        <Editor v-model={this.content} />
      </KeepAlive>
    )
  }
})

export default EditorPage
