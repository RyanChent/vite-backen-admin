import { defineComponent, computed, ref } from 'vue'
import Upload from '../Upload'
import Preview from './Preview'
import { useStore } from 'vuex'
import ElUpload from 'element-plus/lib/el-upload'
import './style'

const ImageUploader = defineComponent({
  name: 'ImageUpload',
  componentName: 'ManageImageUpload',
  __file: '@PC/ImageUpload',
  emits: ['update:fileList'],
  props: Object.assign({}, ElUpload.props, {
    filesize: {
      type: Number,
      default: 0
    },
    draggable: {
      type: Boolean,
      default: false
    }
  }),
  components: {
    Upload,
    Preview
  },
  setup(props, { emit }: any) {
    const store = useStore()
    const token = computed(() => store.state.user.token)
    const preview = ref<any>(false)
    const current = ref<any>(0)
    const imageList = computed<any>({
      get() {
        return props.fileList
      },
      set(value) {
        emit('update:fileList', value)
      }
    })
    return {
      token,
      imageList,
      preview,
      current
    }
  },
  render() {
    return (
      <section>
        <Upload
          action={this.action}
          filesize={this.filesize}
          headers={{
            token: this.token
          }}
          fileList={this.imageList}
          list-type="picture-card"
          customClass="manage-image-upload"
          v-draggable={[
            this.draggable && {
              dom: '.manage-image-upload .el-upload-list',
              target: '.el-upload-list__item',
              callback: ({ newIndex, oldIndex }: any) => {
                ;[this.imageList[newIndex], this.imageList[oldIndex]] = [
                  this.imageList[oldIndex],
                  this.imageList[newIndex]
                ]
              }
            }
          ].filter(Boolean)}
        >
          {{
            default: () => <i class="el-icon-plus" />,
            file: ({ file, download, remove }: any) => (
              <div style="height: 100%">
                <el-image
                  class="el-upload-list__item-thumbnail"
                  src={file.url}
                  alt=""
                  fit="cover"
                />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-preview">
                    <i
                      class="el-icon-zoom-in"
                      onClick={(e: MouseEvent) => {
                        e.stopPropagation()
                        this.current = this.imageList.findIndex(
                          (image: any) => image.uid === file.uid
                        )
                        this.preview = true
                      }}
                    />
                  </span>
                  <span class="el-upload-list__item-delete">
                    <i
                      class="el-icon-download"
                      onClick={(e: MouseEvent) => {
                        e.stopPropagation()
                        download(file.response?.result)
                      }}
                    />
                  </span>
                  <span class="el-upload-list__item-delete">
                    <i
                      class="el-icon-delete"
                      onClick={(e: MouseEvent) => {
                        e.stopPropagation()
                        remove(file, this.imageList)
                      }}
                    />
                  </span>
                </span>
              </div>
            )
          }}
        </Upload>
        <Preview
          v-models={[[this.current], [this.preview, 'preview']]}
          imageList={this.imageList.map((file: any) => file.response?.result?.url || file.url)}
        />
      </section>
    )
  }
})

export default ImageUploader
