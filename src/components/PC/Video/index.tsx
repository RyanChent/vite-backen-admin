import { ref, computed, defineComponent } from 'vue'
import Player from './Player'
import VideoUtil from '@/utils/video'
import './Player/style'
import './style'

let videoUtils: any

const useVideoProps = (props: any) => {
  videoUtils = new VideoUtil(props.url, props.poster, props.title)
  const videoProps = computed(() => Object.assign({}, videoUtils.getConfig(), props.options))
  const wideScreen = ref<boolean>(false)
  const webFullScreen = ref<boolean>(false)
  const download = ref<boolean>(false)
  return {
    videoProps,
    wideScreen,
    webFullScreen,
    download
  }
}

const useHandleVideo = function (this: any) {
  const playerInit = (e: any) => {
    if (videoUtils) {
      videoUtils.videoReady(e, {
        wideScreen: this.wideScreen,
        webFullScreen: this.webFullScreen,
        download: this.download
      })
      this.$emit('ready')
    }
  }
  const playerEnded = (e: any) => {
    if (e.isFullscreen()) {
      e.exitFullscreen()
    }
    e.hasStarted(false)
  }
  return {
    onReady: playerInit,
    onEnd: playerEnded
  }
}

const VideoPlayer = defineComponent({
  name: 'VideoPlayer',
  componentName: 'ManageVideoPlayer',
  components: {
    Player
  },
  __file: '@PC/Video',
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
      default: '测试视频'
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { videoProps, wideScreen, webFullScreen, download } = useVideoProps(props)
    return {
      videoProps,
      wideScreen,
      webFullScreen,
      download
    }
  },
  render() {
    return (
      <div
        class={{
          'vite-video-player': true
        }}
      >
        <div class="video-control-topbar">{this.title}</div>
        <Player
          options={this.videoProps}
          playsinline
          class="vjs-custom-skin"
          {...useHandleVideo.call(this)}
        />
      </div>
    )
  }
})

export default VideoPlayer
