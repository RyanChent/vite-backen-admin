import { defineComponent } from 'vue'
import VideoPlayer from '@PC/Video'
import './style'

const VideoPage = defineComponent({
    name: 'VideoPage',
    componentName: 'VideoPage',
    components: {
        VideoPlayer: defineComponent(VideoPlayer)
    },
    setup() {
        return {

        }
    },
    render() {
        return <VideoPlayer />
    }
})

export default VideoPage