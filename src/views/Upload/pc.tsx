import { computed, defineComponent, resolveComponent, ref } from 'vue'
import { useStore } from 'vuex'
const PCUpload = defineComponent({
    name: 'PCUpload',
    componentName: 'ManagePCUpload',
    setup() {
        const store = useStore()
        const token = computed(() => store.state.user.token)
        const fileList = ref<any>([])
        return {
            token,
            fileList
        }
    },
    render() {
        const Upload: any = resolveComponent('Upload')
        return <Upload
            action={(window as any)._config.api + '/fileupload'}
            drag
            size={1024 * 1024 * 50}
            headers={{
                token: this.token
            }}
            fileList={this.fileList}
            showFileList={false}
        />
    }
})

export default PCUpload