import { defineComponent, computed, ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import './style.less'
import _ from 'lodash';
const Editor = defineComponent({
    name: 'Editor',
    componentName: 'ManageEditor',
    components: {
        QuillEditor
    },
    props: {
        options: {
            type: Object,
            default: () => ({})
        },
        modelValue: String
    },
    setup(props, { emit }: any) {
        const preview = ref(null) as any
        const options = computed(() => Object.assign({}, {
            theme: 'snow',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'font': [] }],
                    [{ 'align': [] }],
                    ['clean']
                ]
            }
        }, props.options))
        const modelValue = computed({
            set(value) {
                emit('update:modelValue', value)
            },
            get() {
                return props.modelValue
            }
        })
        const initQuillEditor = (editor: any) => {
            preview.value = editor.addContainer('ql-preview')
            preview.value.innerHTML = modelValue.value
        }
        const updateContent = (content: string) => {
            modelValue.value = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        }
        watch(() => modelValue.value, () => {
            preview.value.innerHTML = modelValue.value
        })
        return {
            options,
            modelValue,
            initQuillEditor,
            updateContent
        }
    },
    render() {
        return <div>
            <quill-editor
                options={this.options}
                content={this.modelValue}
                contentType="html"
                id="vite-backen-editor"
                onReady={this.initQuillEditor}
                {...{
                    'onUpdate:content': this.updateContent
                }}
            />
        </div>
    }
})

export default Editor