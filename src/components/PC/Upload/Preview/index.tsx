import { computed, defineComponent, onMounted, ref } from 'vue'
import Dialog from '../../Dialog'
import { domResize } from '@/utils/dom.ts'
import { uuid } from '@/utils/tool.ts'
const useGetComponent = ({ file }: any, domId: string) => {
    const name = (file.url || '').split('/').pop() || ''
    const fileProps = {
        title: `${name}-预览`,
        showMaximize: true,
        dragging: true,
        customClass: uuid()
    }
    let fileComponent = null
    switch ((file.type || '').split('/').pop()) {
        case 'jpg':
        case 'png':
        case 'jpeg':
        case 'gif':
            fileComponent = <img src={file.url} alt={name} class={domId} />
            break;
        case 'doc':
        case 'docx':
        case 'xls':
        case 'xlsx':
        case 'pdf':
        case 'ppt':
            fileComponent = <iframe
                src={`https://view.officeapps.live.com/op/view.aspx?src=${file.url}`}
                frameborder='no'
                width="100%"
                height="100%"
                class={domId}
            />
            break;
        default:
            fileComponent = <iframe
                src={file.url}
                frameborder='no'
                width="100%"
                height="100%"
                class={domId}
            />
            break;
    }
    return {
        fileProps,
        fileComponent
    }
}
const Preview = defineComponent({
    name: 'filePreview',
    componentName: 'ManageFilePreview',
    components: {
        Dialog
    },
    props: {
        file: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, { emit }: any) {
        let resize = null
        let domId = ''
        const fileProps = ref<any>({})
        const fileComponent = ref<any>(null)
        const visible = computed<any>({
            get() {
                domId = uuid()
                const file = useGetComponent(props, domId)
                fileProps.value = file.fileProps
                fileComponent.value = file.fileComponent
                return Object.keys(props.file).length > 0
            },
            set(value) {
                if (value === false) {
                    emit('update:file', {})
                }
            }
        })
        onMounted(() => {
            // const dom = document.querySelector(`.${domId}`)
            // console.log(dom)
        })
        return {
            visible,
            fileProps,
            fileComponent
        }
    },
    render() {
        return <Dialog v-model={this.visible} {...this.fileProps}>
            {this.fileComponent}
        </Dialog>
    }
})

export default Preview