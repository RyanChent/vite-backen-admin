import { defineComponent } from 'vue'
import ElTransfer from 'element-plus/lib/el-transfer'
import { useTransferProps } from '@/hooks/transfer'
import { isFunction } from '@/utils/types'
import './style'

const Transfer = defineComponent({
    name: 'Transfer',
    componentName: 'ManagePCTransfer',
    __file: '@PC/Transfer',
    components: {
        ElTransfer
    },
    props: Object.assign({}, ElTransfer.props, {
        selectedKeys: {
            type: Array,
            default: () => []
        }
    }),
    setup(props, { emit }: any) {
        const { transferProps, transferRef, transferKeys } = useTransferProps(props, emit, ElTransfer)
        return {
            transferProps,
            transferRef,
            transferKeys
        }
    },
    render() {
        const slots: any = this.$slots
        return <section class="manage-pc-transfer">
            <ElTransfer
                v-model={this.transferKeys}
                {...this.transferProps}
                ref={(el: any) => el && (this.transferRef = el)}
            >
                {Object.assign({},
                    isFunction(slots['left-footer']) && { 'left-footer': slots['left-footer'] },
                    isFunction(slots['right-footer']) && { 'right-footer': slots['right-footer'] },
                    isFunction(slots.default) && { default: slots.default }
                )}
            </ElTransfer>
        </section>
    }
})

export default Transfer