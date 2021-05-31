import { defineComponent, computed, Transition, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import './style'
import _ from 'lodash'

const getTransform = () => ({
  scale: 1,
  deg: 0,
  offsetX: 0,
  offsetY: 0,
  enableTransition: false
})

const Mode = {
  CONTAIN: {
    name: 'contain',
    icon: 'el-icon-full-screen'
  },
  ORIGINAL: {
    name: 'original',
    icon: 'el-icon-c-scale-to-original'
  }
}

const useProps = (props: any, emit: any) => {
  const index = computed<number>({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const visible = computed<boolean>({
    get() {
      return props.preview
    },
    set(value) {
      emit('update:preview', value)
    }
  })

  return {
    visible,
    index
  }
}

const useHandleImg = () => {
  const transform = ref<any>(getTransform())
  const mode = ref<any>(Mode.CONTAIN)
  const imgStyle = computed(() => {
    const { scale, deg, offsetX, offsetY, enableTransition } = transform.value
    const style = {
      transform: `scale(${scale}) rotate(${deg}deg)`,
      transition: enableTransition ? 'transform .3s' : '',
      marginLeft: `${offsetX}px`,
      marginTop: `${offsetY}px`
    }
    if (mode.value.name === Mode.CONTAIN.name) {
      Object.assign(style, {
        maxWidth: '100%',
        maxHeight: '100%'
      })
    }
    return style
  })

  const toggleMode = () => {
    const name = mode.value.name.toUpperCase()
    mode.value = Mode[name === 'CONTAIN' ? 'ORIGINAL' : 'CONTAIN']
    transform.value = getTransform()
  }

  const handleActions = (action: string, options = {}) => {
    const { zoomRate, rotateDeg, enableTransition } = {
      zoomRate: 0.2,
      rotateDeg: 90,
      enableTransition: true,
      ...options
    }
    switch (action) {
      case 'zoomOut':
        transform.value.scale = Math.max(
          0.2,
          parseFloat((transform.value.scale - zoomRate).toFixed(3))
        )
        break
      case 'zoomIn':
        transform.value.scale = parseFloat((transform.value.scale + zoomRate).toFixed(3))
        break
      case 'clocelise':
        transform.value.deg += rotateDeg
        break
      case 'anticlocelise':
        transform.value.deg -= rotateDeg
        break
    }
    transform.value.enableTransition = enableTransition
  }

  const keydownHandler = _.throttle(
    (e: KeyboardEvent) =>
      ((
        {
          32: toggleMode(),
          38: handleActions('zoomIn'),
          40: handleActions('zoomOut')
        } as any
      )[e.code]),
    200
  )

  const mouseWheelHandler = _.throttle((e: any) => {
    const delta = e.wheelDelta ? e.wheelDelta : -e.detail
    delta > 0 && handleActions('zoomIn', { zoomRate: 0.015, enableTransition: false })
    delta <= 0 && handleActions('zoomOut', { zoomRate: 0.015, enableTransition: false })
  }, 200)

  const addImgEventListener = () => {
    document.addEventListener('keydown', keydownHandler)
    document.addEventListener('wheel', mouseWheelHandler)
  }

  const removeImgEventListener = () => {
    document.removeEventListener('keydown', keydownHandler)
    document.removeEventListener('wheel', mouseWheelHandler)
  }

  const ImgMouseDown = (e: MouseEvent) => {
    const { offsetX, offsetY } = transform.value
    const { pageX, pageY } = e
    const dragHandler = (ev: MouseEvent) => {
      transform.value.offsetX = offsetX + ev.pageX - pageX
      transform.value.offsetY = offsetY + ev.pageY - pageY
    }
    document.addEventListener('mousemove', dragHandler)
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', dragHandler)
    })
  }

  return {
    transform,
    mode,
    imgStyle,
    toggleMode,
    handleActions,
    addImgEventListener,
    removeImgEventListener,
    ImgMouseDown
  }
}

const ImagePreviewer = defineComponent({
  name: 'ImagePreview',
  componentName: 'ManageImagePreview',
  __file: '@PC/ImageUpload/Preview/index.tsx',
  props: {
    imageList: {
      type: Array,
      default: () => []
    },
    preview: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }: any) {
    const { visible, index } = useProps(props, emit)
    const {
      transform,
      mode,
      toggleMode,
      imgStyle,
      handleActions,
      addImgEventListener,
      removeImgEventListener,
      ImgMouseDown
    } = useHandleImg()
    onMounted(addImgEventListener)
    onBeforeUnmount(removeImgEventListener)
    watch(
      () => visible.value,
      () => {
        if (visible.value === false) {
          index.value = 0
          transform.value = getTransform()
          mode.value = Mode.CONTAIN
          removeImgEventListener()
        }
      },
      { immediate: true }
    )
    return {
      visible,
      index,
      transform,
      mode,
      toggleMode,
      imgStyle,
      handleActions,
      ImgMouseDown
    }
  },
  render() {
    return (
      <Transition enterActiveClass="animated zoomIn" leaveActiveClass="animated zoomOut">
        {this.visible && (
          <div class="manage-pc-preview-viewer" tabindex={0}>
            <header>
              <i
                class="el-icon-close"
                title="关闭"
                onClick={(e: MouseEvent) => {
                  e.stopPropagation()
                  this.visible = false
                }}
              />
            </header>
            {this.imageList.length > 1 && (
              <>
                <span
                  class={{
                    'el-image-viewer__btn': true,
                    'el-image-viewer__prev': true
                  }}
                  title="上一张"
                  onClick={() => {
                    this.index = (this.index - 1 + this.imageList.length) % this.imageList.length
                    this.transform = getTransform()
                  }}
                >
                  <i class="el-icon-arrow-left" />
                </span>
                <span
                  class={{
                    'el-image-viewer__btn': true,
                    'el-image-viewer__next': true
                  }}
                  title="下一张"
                  onClick={() => {
                    this.index = (this.index + 1) % this.imageList.length
                    this.transform = getTransform()
                  }}
                >
                  <i class="el-icon-arrow-right" />
                </span>
              </>
            )}
            <section class="el-image-viewer__canvas">
              {this.imageList.map((url: any, index) => (
                <Transition
                  enterActiveClass="animated fadeInRightBig"
                  leaveActiveClass="animated fadeOutLeftBig"
                >
                  {this.index === index && (
                    <img
                      class="el-image-viewer__img"
                      src={url}
                      key={url}
                      style={this.imgStyle}
                      onMousedown={this.ImgMouseDown}
                    />
                  )}
                </Transition>
              ))}
            </section>
            <footer class="el-image-viewer__actions manage-pc-actions-bar">
              <div class="el-image-viewer__actions__inner">
                <i class="el-icon-zoom-out" onClick={() => this.handleActions('zoomOut')} />
                <i class="el-icon-zoom-in" onClick={() => this.handleActions('zoomIn')} />
                <i class="el-image-viewer__actions__divider" />
                <i class={this.mode.icon} onClick={this.toggleMode} />
                <i class="el-image-viewer__actions__divider" />
                <i
                  class="el-icon-refresh-left"
                  onClick={() => this.handleActions('anticlocelise')}
                />
                <i class="el-icon-refresh-right" onClick={() => this.handleActions('clocelise')} />
              </div>
            </footer>
          </div>
        )}
      </Transition>
    )
  }
})

export default ImagePreviewer
