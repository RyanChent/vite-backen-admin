import { defineComponent, inject } from 'vue'
import PCUpload from './pc'
import MobileUpload from './mobile'
import './style.less'

const UploadPage = defineComponent({
    name: 'UploadPage',
    componentName: 'ManageUploadPage',
    components: {
        PCUpload,
        MobileUpload
    },
    setup() {
        const isMobile = inject<any>('isMobile')
        return () => !!isMobile.value ? <MobileUpload /> : <PCUpload />
    },
})

export default UploadPage