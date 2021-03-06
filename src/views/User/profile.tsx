import { defineComponent, ref } from 'vue'

const profile = defineComponent({
  name: 'Profile',
  componentName: 'ManageMobileProfile',
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    modelValue: Boolean
  },
  setup() {
    return {
      showPreview: ref<any>(false)
    }
  },
  render() {
    return (
      <header
        onClick={(e: MouseEvent) => {
          e.stopPropagation()
          this.$emit('update:modelValue', true)
        }}
      >
        <van-image-preview
          images={[this.user.avatar]}
          v-model={[this.showPreview, 'show']}
          showIndex={false}
        />
        <van-image
          width={70}
          fit="cover"
          height={70}
          src={this.user.avatar}
          radius={19}
          style="border: solid 1px #d9d9d9"
          onClick={(e: MouseEvent) => {
            e.stopPropagation()
            this.showPreview = true
          }}
        >
          {{
            loading: () => <van-loading type="spinner" size="20" />,
            error: () => <span>加载失败</span>
          }}
        </van-image>
        <div class="desc">
          <p>
            <b>{this.user.username}</b>
          </p>
          <p>邮箱：{this.user.email}</p>
        </div>
        <van-icon name="arrow" />
      </header>
    )
  }
})

export default profile
