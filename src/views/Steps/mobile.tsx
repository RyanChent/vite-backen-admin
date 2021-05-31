import { defineComponent, computed, resolveComponent } from 'vue'

const MobileSteps = defineComponent({
  name: 'MobileStepsPage',
  componentName: 'ManageMobileSteps',
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    steps: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }: any) {
    const active = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        emit('update:modelValue', value)
      }
    })
    return {
      active
    }
  },
  render() {
    const MobileSteps: any = resolveComponent('MobileSteps')
    return (
      <MobileSteps
        v-model={[this.active, 'active']}
        steps={this.steps.slice(0, 3)}
        class="manage-mobile-steps-demo"
        confirm={() => {
          this.$toast.success('我到底了')
        }}
      >
        {new Array(3).fill(null).reduce((self: any, item: undefined, index: number) => {
          self[`step${index}`] = () => (
            <div key={index} class="test-panel">
              测试面板{index}
            </div>
          )
          return self
        }, {})}
      </MobileSteps>
    )
  }
})

export default MobileSteps
