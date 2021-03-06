import { defineComponent, computed, ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { getEditorConfig } from '@/data/editor'
import './style'
const Editor = defineComponent({
  name: 'Editor',
  componentName: 'ManageEditor',
  __file: '@PC/Editor',
  emits: ['update:modelValue'],
  components: {
    QuillEditor
  },
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }: any) {
    const preview = ref<any>(null)
    const options = computed(() => Object.assign({}, getEditorConfig(), props.options))
    const modelValue = computed({
      set(value: string) {
        emit('update:modelValue', value.replace(/&lt;/g, '<').replace(/&gt;/g, '>'))
      },
      get() {
        return props.modelValue.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      }
    })
    const initQuillEditor = (editor: any) => {
      preview.value = editor.addContainer('ql-preview')
      preview.value.innerHTML = modelValue.value
    }
    watch(
      () => modelValue.value,
      () => {
        preview.value.innerHTML = modelValue.value
      }
    )
    return {
      options,
      modelValue,
      initQuillEditor
    }
  },
  render() {
    return (
      <div>
        <quill-editor
          options={this.options}
          v-model={[this.modelValue, 'content']}
          contentType="html"
          id="vite-backen-editor"
          onReady={this.initQuillEditor}
        />
      </div>
    )
  }
})

export default Editor
