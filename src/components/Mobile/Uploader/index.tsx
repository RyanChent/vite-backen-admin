import { defineComponent } from 'vue'
import { Uploader } from 'vant'
import { useMobileUpload } from '@/hooks/upload'
import './style'

const MobileUpload = defineComponent({
    name: 'MobileUpload',
    componentName: 'ManageMobileUpload',
    components: {
        Uploader
    },
    props: Object.assign({}, Uploader.props, {

    }),
    setup(props: any, { emit }: any) {
        return useMobileUpload(props, emit, Uploader)
    },
    render() {
        return <Uploader
            v-model={this.fileList}
            {...this.uploadProps}
            ref={(el: any) => el && (this.fileRef = el)}
        />
    }
})

export default MobileUpload