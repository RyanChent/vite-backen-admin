import { computed, defineComponent, ref, watch } from 'vue'
import { isFunction } from '@/utils/types'
import { useRoute } from 'vue-router'
import Search from '@PC/Search'
import './style'

const globalHeader = defineComponent({
  name: 'MobileHeader',
  componentName: 'ManageMobileHeader',
  __file: '@Mobile/globalHeader',
  components: {
    Search
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }: any) {
    const route = useRoute()
    const current = ref<any>(route.path)
    const showLeft = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        emit('update:modelValue', value)
      }
    })
    watch(
      () => route.path,
      () => {
        current.value = route.path
      }
    )
    return {
      showLeft,
      current
    }
  },
  render() {
    const slots: any = this.$slots
    return (
      <van-nav-bar onClickLeft={() => (this.showLeft = true)} safe-area-inset-top>
        {Object.assign(
          {},
          this.current !== '/me' && {
            left: () => (
              <>
                <van-icon name="arrow" />
                <span>菜单</span>
              </>
            ),
            right: () => (isFunction(slots.rightNav) ? slots.rightNav() : <Search />)
          }
        )}
      </van-nav-bar>
    )
  }
})

export default globalHeader
