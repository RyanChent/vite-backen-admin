import { defineComponent, ref } from 'vue'
import { launchFullscreen, exitFullscreen } from '@/utils/dom.ts'

const fullScreen = defineComponent({
    name: 'fullScreen',
    componentName: 'ManageFullScreen',
    setup() {
        const fullScreen = ref(false)
        return () => <i class={{
            'header-fullscreen': true,
            'el-icon-full-screen': !fullScreen.value,
            'el-icon-copy-document': fullScreen.value
        }}
            title={!!fullScreen.value ? '还原' : '全屏'}
            onClick={() => {
                !!fullScreen.value ? exitFullscreen(document) : launchFullscreen(document.documentElement)
                fullScreen.value = !fullScreen.value
            }}
        />
    }
})

export default fullScreen