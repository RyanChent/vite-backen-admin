import { defineComponent, onMounted, onBeforeUnmount } from 'vue'
import { useVideoPlayerProps, useHandleVideoEvent } from '@/hooks/video'
import { isFunction } from '@/utils/types'
const Player = defineComponent({
    name: 'VueVideoPlayer',
    componentName: 'ManageVueVideoPlayer',
    props: {
        start: {
            type: Number,
            default: 0
        },
        crossOrigin: {
            type: String,
            default: ''
        },
        playsinline: {
            type: Boolean,
            default: false
        },
        customEventName: {
            type: String,
            default: 'statechanged'
        },
        options: {
            type: Object,
            default: () => { }
        },
        events: {
            type: Array,
            default: () => []
        },
        globalOptions: {
            type: Object,
            default: () => ({
                controls: true,
                controlBar: {
                    remainingTimeDisplay: false,
                    playToggle: {},
                    progressControl: {},
                    fullscreenToggle: {},
                    volumeMenuButton: {
                        inline: false,
                        vertical: true
                    }
                },
                techOrder: ['html5'],
                plugins: {}
            })
        },
        globalEvents: {
            type: Array,
            default: () => []
        },
        trackList: {
            type: Array,
            default: () => []
        }
    },
    setup(props, { emit }: any) {
        const { player, reseted, video, } = useVideoPlayerProps(props)
        const { initialize, dispose } = useHandleVideoEvent({ props, emit, player, video, reseted })
        onMounted(() => {
            if (!player.value) {
                initialize()
            }
        })
        onBeforeUnmount(() => {
            if (player.value) {
                dispose(null)
            }
        })
        return {
            player,
            reseted,
            video,
            initialize,
            dispose
        }
    },
    render() {
        const slots: any = this.$slots
        return this.reseted && <div class="video-player">
            {isFunction(slots.title) && slots.title()}
            <video class="video-js" ref={(el: any) => el && (this.video = el)}>
                {this.trackList.map((crtTrack: any) =>
                    <track {...crtTrack} />
                )}
            </video>
        </div>
    }
})

export default Player