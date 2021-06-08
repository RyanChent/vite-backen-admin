import { defineComponent } from 'vue'
import VideoPlayer from '@PC/Video'
import './style'

const VideoPage = defineComponent({
  name: 'VideoPage',
  componentName: 'VideoPage',
  components: {
    VideoPlayer: defineComponent(VideoPlayer)
  },
  render() {
    return <VideoPlayer wideScreen webFullScreen download />
  }
})

export default VideoPage
