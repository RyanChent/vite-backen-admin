import { computed, defineComponent, resolveComponent, ref } from 'vue'
import { useStore } from 'vuex'
const PCUpload = defineComponent({
  name: 'PCUpload',
  componentName: 'ManagePCUpload',
  setup() {
    const store = useStore()
    const token = computed(() => store.state.user.token)
    const fileList = ref<any>([])
    const imageList = ref<any>([])
    return {
      token,
      fileList,
      imageList
    }
  },
  render() {
    const Upload: any = resolveComponent('Upload')
    const ImageUpload: any = resolveComponent('ImageUpload')
    return (
      <section class="manage-pc-upload-page">
        <>
          <header>拖拽上传</header>
          <Upload
            action={(window as any)._config.api + '/fileupload'}
            drag
            filesize={1024 * 1024 * 50}
            headers={{
              token: this.token
            }}
            fileList={this.fileList}
            showFileList={false}
          />
        </>
        <>
          <header>图片上传</header>
          <ImageUpload
            v-model={[this.imageList, 'fileList']}
            action={(window as any)._config.api + '/fileupload'}
            draggable
          />
        </>
      </section>
    )
  }
})

export default PCUpload
