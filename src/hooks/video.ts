import { nextTick, ref, watch } from 'vue'
import _videojs from 'video.js'
import { isFunction } from '@/utils/types'

const videojs = (window as any).videojs || _videojs

const DEFAULT_EVENTS = [
  'loadeddata',
  'canplay',
  'canplaythrough',
  'play',
  'pause',
  'waiting',
  'playing',
  'ended',
  'error'
]

export const useVideoPlayerProps = (props: any) => {
  const player = ref<any>(null)
  const reseted = ref<boolean>(true)
  const video = ref<any>(null)
  return {
    player,
    reseted,
    video
  }
}

export const useHandleVideoEvent = ({ props, emit, video, player, reseted }: any) => {
  const initialize = () => {
    if (video.value) {
      const videoOptions = Object.assign({}, props.globalOptions, props.options)
      if (props.playsinline === true) {
        video.value.setAttribute('playsinline', props.playsinline)
        video.value.setAttribute('webkit-playsinline', props.playsinline)
        video.value.setAttribute('x5-playsinline', props.playsinline)
        video.value.setAttribute('x5-video-player-type', 'h5')
        video.value.setAttribute('x5-video-player-fullscreen', false)
      }

      if (props.crossOrigin !== '') {
        video.value.crossOrigin = props.crossOrigin
        video.value.setAttribute('crossOrigin', props.crossOrigin)
      }

      const emitPlayerState = (event: string, value: any) => {
        if (event) {
          emit(event, props.player)
        }
        if (value) {
          emit(props.customEventName, { [event]: value })
        }
      }

      if (videoOptions.plugins) {
        delete videoOptions.plugins.__ob__
      }
      player.value = videojs(video.value, videoOptions, function (this: any) {
        const events = DEFAULT_EVENTS.concat(props.events).concat(props.globalEvents)

        const onEdEvents: any = {}
        for (let i = 0; i < events.length; i++) {
          if (typeof events[i] === 'string' && onEdEvents[events[i]]) {
            ;((event) => {
              onEdEvents[event] = null
              this.on(event, () => {
                emitPlayerState(event, true)
              })
            })(events[i])
          }
        }

        this.on('timeupdate', function (this: any) {
          emitPlayerState('timeupdate', this.currentTime())
        })

        emit('ready', this)
      })
    }
  }

  const dispose = (callback: any) => {
    if (player.value && player.value.dispose) {
      if (player.value.techName_ !== 'Flash') {
        player.value.pause && player.value.pause()
      }
      player.value.dispose()
      player.value = null
      nextTick(() => {
        reseted.value = false
        nextTick(() => {
          reseted.value = true
          nextTick(() => {
            isFunction(callback) && callback()
          })
        })
      })
    }
  }
  watch(
    () => props.options,
    (options, oldOptions) => {
      dispose(() => {
        if (options && options.sources && options.sources.length) {
          initialize()
        }
      })
    },
    { deep: true }
  )

  return {
    initialize,
    dispose
  }
}
