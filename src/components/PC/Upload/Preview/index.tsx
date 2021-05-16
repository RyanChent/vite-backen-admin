import { computed, defineComponent, ref } from 'vue'
import Dialog from '../../Dialog'
import { isNotEmptyString } from '@/utils/types.ts'

const useGetComponent = ({ file }: any) => {
    const name = (file.url || '').split('/').pop() || ''
    const suffix = (file.type || '').split('/').pop()
    const fileProps = {
        title: `${name}-预览`,
        showMaximize: true,
        dragging: true
    }
    let fileComponent = null
    if (isNotEmptyString(suffix)) {
        switch (suffix) {
            case 'jpg':
            case 'png':
            case 'jpeg':
            case 'gif':
                fileComponent = <img src={file.url} alt={name} style="object-fit: contain" />
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
                    style="min-height: 200px;object-fit: contain"
                />
                break;
            default:
                fileComponent = <iframe
                    src={file.url}
                    frameborder='no'
                    width="100%"
                    height="100%"
                    style="min-height: 200px;object-fit: contain"
                />
                break;
        }
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
        const fileProps = ref<any>({})
        const fileComponent = ref<any>(null)
        const visible = computed<any>({
            get() {
                if (Object.keys(props.file).length > 0) {
                    const file = useGetComponent(props)
                    fileProps.value = file.fileProps
                    fileComponent.value = file.fileComponent
                    return true
                }
                return false
            },
            set(value) {
                if (value === false) {
                    emit('update:file', {})
                }
            }
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