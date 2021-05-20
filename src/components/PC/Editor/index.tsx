import { defineComponent, computed, ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import './style.less'
import { getEditorConfig } from '@/data/editor.ts'
const Editor = defineComponent({
    name: 'Editor',
    componentName: 'ManageEditor',
    __file: '@PC/Editor/index.tsx',
    __emits: {
        'update:modelVaue': null
    },
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
            set(value) {
                emit('update:modelValue', (value as string).replace(/&lt;/g, '<').replace(/&gt;/g, '>'))
            },
            get() {
                return props.modelValue.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
            }
        })
        const initQuillEditor = (editor: any) => {
            preview.value = editor.addContainer('ql-preview')
            preview.value.innerHTML = modelValue.value
        }
        watch(() => modelValue.value, () => {
            preview.value.innerHTML = modelValue.value
        })
        return {
            options,
            modelValue,
            initQuillEditor,
        }
    },
    render() {
        return <div>
            <quill-editor
                options={this.options}
                v-model={[this.modelValue, 'content']}
                content={this.modelValue}
                contentType="html"
                id="vite-backen-editor"
                onReady={this.initQuillEditor}
            />
        </div>
    }
})

export default Editor