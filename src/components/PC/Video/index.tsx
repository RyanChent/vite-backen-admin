import { computed, defineComponent, ref } from 'vue'
import Player from './Player'
import VideoUtil from '@/utils/video'
import './Player/style'
import './style'

let videoUtils: any

const useVideoProps = (props: any) => {
  const widefull = ref<boolean>(false)
  const webfull = ref<boolean>(false)
  videoUtils = new VideoUtil({
    url: props.url,
    poster: props.poster,
    title: props.title,
    widefull,
    webfull
  })
  const videoProps = computed(() => Object.assign({}, videoUtils.getConfig(), props.options))
  return {
    videoProps,
    widefull,
    webfull
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
      this.$emit('ready', e, videoUtils)
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
      default: 'https://jarrychen.cn/video/tuoleijiya.jpeg'
    },
    title: {
      type: String,
      default: '测试视频'
    },
    wideScreen: {
      type: Boolean,
      default: false
    },
    webFullScreen: {
      type: Boolean,
      default: false
    },
    download: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { videoProps, widefull, webfull } = useVideoProps(props)
    return {
      videoProps,
      widefull,
      webfull
    }
  },
  render() {
    return (
      <div
        class={{
          'vite-video-player': true,
          webfull: this.webfull
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
