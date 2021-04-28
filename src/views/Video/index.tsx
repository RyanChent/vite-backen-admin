import { defineComponent, resolveComponent } from 'vue'
import './style.less'

const VideoPage = defineComponent({
    name: 'VideoPage',
    componentName: 'ManageVideoPage',
    setup() {
        return {
            
        }
    },
    render() {
        const VideoPlayer = resolveComponent('VideoPlayer') as any
        return <VideoPlayer />
    }
})

export default VideoPage