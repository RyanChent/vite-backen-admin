import { defineComponent, ref, resolveComponent } from 'vue'

const mobileUpload = defineComponent({
  name: 'mobileUpload',
  componentName: 'ManageMobileUpload',
  setup() {
    return {
      fileList: ref<any>([])
    }
  },
  render() {
    const MobileUpload: any = resolveComponent('MobileUpload')
    return <MobileUpload v-model={this.fileList} />
  }
})

export default mobileUpload
