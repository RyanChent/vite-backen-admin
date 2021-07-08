import { defineComponent, resolveComponent, reactive, ref } from 'vue'
import './style'

const TransferPage = defineComponent({
  name: 'TransferPage',
  componentName: 'ManagePCTransferPage',
  setup() {
    const data = reactive(
      new Array(12).fill(null).map((item: undefined, index: number) => ({
        key: index + 1,
        label: `节点${index + 1}`,
        disabled: index % 2 === 0
      }))
    )
    const value = ref<any>([])
    return {
      data,
      value
    }
  },
  render() {
    const Transfer: any = resolveComponent('Transfer')
    return (
      <Transfer
        v-model={[this.value, 'selectedKeys']}
        data={this.data}
        buttonTexts={['移除', '添加']}
      />
    )
  }
})

export default TransferPage
