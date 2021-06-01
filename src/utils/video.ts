import { downloadFile } from '../api/tool'
import { exitFullscreen } from './dom'
import { downFile } from './tool'
import axios from 'axios'

class VideoUtil {
  private isBrowser = false
  private wideScreen: any = null
  private webFullScreen: any = null
  private downLoad: any = null
  private url: string = ''
  private poster: string = ''
  private widefull: any
  private webfull: any
  private fullscreen: boolean = false
  private title: string = ''
  constructor({ url, poster, title, widefull, webfull }: any) {
    this.isBrowser = typeof window !== 'undefined'
    this.url = url
    this.poster = poster
    this.title = title
    this.widefull = widefull
    this.webfull = webfull
  }
  getConfig() {
    return {
      playbackRates: [0.5, 0.7, 1.0, 1.25, 1.5, 2.0], // 播放速度
      autoplay: false, // 如果true,浏览器准备好时开始回放。
      muted: false, // 默认情况下将会消除任何音频。
      loop: false, // 导致视频一结束就重新开始。
      preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
      language: 'zh-CN',
      aspectRatio: '2:1', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
      fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
      sources: [this.url],
      // fill: true,
      poster: this.poster, // 你的封面地址
      // width: document.documentElement.clientWidth,
      notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      controlBar: {
        timeDivider: true,
        durationDisplay: true,
        fullscreenToggle: true, // 全屏按钮
        captionsButton: false,
        chaptersButton: false,
        playbackRateMenuButton: true,
        LiveDisplay: true,
        subtitlesButton: false,
        remainingTimeDisplay: true,
        progressControl: true,
        volumeMenuButton: {
          inline: false,
          vertical: true
        }
      }
    }
  }
  downLoadVideo() {
    const url: any = this.url
    downloadFile({ url })
      .then((res: any) => {
        if (res.data) {
          downFile(res.data, url.split('/').pop())
        }
      })
      .catch((e: any) => {
        if (e.response?.status === 404) {
          axios({
            url,
            method: 'post',
            responseType: 'blob',
            withCredentials: true
          }).then((res: any) => {
            if (res.data) {
              downFile(res.data, url.split('/').pop())
            }
          })
        }
      })
  }
  wideScreenChange({ el_ }: any) {
    let html = ''
    this.widefull.value = !this.widefull.value
    if (this.widefull.value) {
      html = `<i class="iconfont vite-icon-wide-reset diy-icon" title="还原"/>`
    } else {
      html = `<i class="iconfont vite-icon-wide diy-icon" title="宽屏"/>`
    }
    el_.querySelector('.vjs-icon-placeholder').innerHTML = html
  }
  webFullScreenChange({ el_ }: any) {
    let html = ''
    this.webfull.value = !this.webfull.value
    if (this.webfull.value) {
      html = `<i class="iconfont vite-icon-webfull-reset diy-icon" title="还原">`
    } else {
      html = `<i class="iconfont vite-icon-webfull diy-icon" title="网页全屏"/>`
    }
    el_.querySelector('.vjs-icon-placeholder').innerHTML = html
  }
  videoDBClick($el: any) {
    if (this.fullscreen) {
      exitFullscreen(document)
      this.fullscreen = false
    } else {
      $el.webkitRequestFullScreen()
      this.fullscreen = true
    }
  }
  videoReady(
    e: any,
    options = {
      wideScreen: false,
      webFullScreen: false,
      download: false
    }
  ) {
    if (this.isBrowser) {
      if (options.wideScreen && !this.wideScreen) {
        this.wideScreen = e.controlBar.addChild('button', {}, 11)
        this.wideScreen.el_.querySelector(
          '.vjs-icon-placeholder'
        ).innerHTML = `<i class="iconfont vite-icon-wide diy-icon" title="宽屏"/>`
        this.wideScreen.on('click', () => this.wideScreenChange(this.wideScreen))
      }
      if (options.webFullScreen && !this.webFullScreen) {
        this.webFullScreen = e.controlBar.addChild('button', {}, 12)
        this.webFullScreen.el_.querySelector(
          '.vjs-icon-placeholder'
        ).innerHTML = `<i class="iconfont vite-icon-webfull diy-icon" title="网页全屏"/>`
        this.webFullScreen.on('click', () => this.webFullScreenChange(this.webFullScreen))
      }
      if (options.download && !this.downLoad) {
        this.downLoad = e.controlBar.addChild('button', {}, 1)
        this.downLoad.el_.querySelector(
          '.vjs-icon-placeholder'
        ).innerHTML = `<i class="el-icon-download diy-icon" title="下载" />`
        this.downLoad.on('click', () => this.downLoadVideo())
      }
      const pictureInPicture = e.controlBar.el_.querySelector('.vjs-picture-in-picture-control')
      pictureInPicture.innerHTML = `<i class="el-icon-picture-outline-round" style="cursor: pointer" /><span class="vjs-control-text" aria-live="polite">Picture-in-Picture</span>`
    }
  }
  getFlagData() {
    return {
      webfull: this.webfull.value,
      widefull: this.widefull.value,
      fullscreen: this.fullscreen
    }
  }
}

export default VideoUtil
