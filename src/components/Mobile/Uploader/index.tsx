import { defineComponent } from 'vue'
import { Uploader } from 'vant'
import { useMobileUpload } from '@/hooks/upload'
import { isNotEmptyString, isFunction } from '@/utils/types'
import './style'

const MobileUpload = defineComponent({
  name: 'MobileUpload',
  componentName: 'ManageMobileUpload',
  __file: '@Mobile/Uploader',
  emits: ['oversize', 'click-preview', 'close-preview', 'delete', 'update:modelValue'],
  components: {
    Uploader
  },
  props: Object.assign({}, Uploader.props, {
    customClass: {
      type: String as any,
      default: ''
    },
    httpRequest: {
      type: Function
    },
    data: {
      type: Object,
      default: () => ({})
    },
    draggable: {
      type: Boolean,
      default: false
    }
  }),
  setup(props: any, { emit }: any) {
    return useMobileUpload(props, emit, Uploader)
  },
  render() {
    const slots: any = this.$slots
    return (
      <Uploader
        v-model={this.fileList}
        {...this.uploadProps}
        ref={(el: any) => el && (this.fileRef = el)}
        class={Object.assign(
          {
            'manage-mobile-upload': true
          },
          isNotEmptyString(this.customClass) && {
            [this.customClass]: true
          }
        )}
        v-draggable={[
          this.draggable && {
            dom: '.van-uploader__wrapper',
            target: '.van-uploader__preview-cover',
            callback: ({ newIndex, oldIndex }: any) => {
              ;[this.fileList[newIndex], this.fileList[oldIndex]] = [
                this.fileList[oldIndex],
                this.fileList[newIndex]
              ]
            }
          }
        ].filter(Boolean)}
      >
        {Object.assign(
          {
            'preview-cover': (item: any) =>
              isFunction(slots['preview-cover'])
                ? slots['preview-cover'](item)
                : item.file?.name && (
                    <div class="preview-cover van-ellipsis" title={item.file.name}>
                      {item.file.name}
                    </div>
                  )
          },
          isFunction(slots.default) && {
            default: slots.default
          }
        )}
      </Uploader>
    )
  }
})

export default MobileUpload
