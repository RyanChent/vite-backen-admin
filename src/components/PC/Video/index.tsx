import { defineComponent } from 'vue'
import './style.less'

const VideoPlayer = defineComponent({
    name: 'VideoPlayer',
    componentName: 'ManageVideoPlayer',
    props: {
        url: {
            type: String,
            default: 'https://jarrychen.cn/video/tuoleijiya.MP4'
        },
        poster: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: '暂未完成'
        },
        options: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        return {
        }
    },
    render() {
        return <div class={{
            'vite-video-player': true,
        }}>
            <div class="video-control-topbar">{this.title}</div>
        </div>
    }
})

export default VideoPlayer