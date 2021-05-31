import { defineComponent, resolveComponent, computed } from 'vue'
const PCSteps = defineComponent({
  name: 'PCSteps',
  componentName: 'ManagePCSteps',
  props: {
    steps: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Number,
      default: 0
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
    const Steps: any = resolveComponent('Steps')
    return (
      <Steps
        steps={this.steps}
        align-center
        finish-status="success"
        v-model={[this.active, 'active']}
        class="manage-pc-steps-demo"
        confirm={() => (this as any).$message.success('我到底了')}
      >
        {new Array(this.steps.length)
          .fill(null)
          .reduce((self: any, item: undefined, index: number) => {
            self[`step${index}`] = () => (
              <div key={index} class="test-panel">
                测试面板{index}
              </div>
            )
            return self
          }, {})}
      </Steps>
    )
  }
})

export default PCSteps
