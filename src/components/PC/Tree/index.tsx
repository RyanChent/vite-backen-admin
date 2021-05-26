import { defineComponent } from 'vue'
import ElTree from 'element-plus/lib/el-tree'
import { isFunction } from '@/utils/types'
import { useTreeProps } from '@/hooks/tree'
import { t } from '@/lang'
import './style'

const defaultTreeNode = (node: any, data: any) => <>
    <span class="node-content">{data.label}</span>
</>

const Tree = defineComponent({
    name: 'Tree',
    componentName: 'ManagePCTree',
    components: {
        ElTree
    },
    props: Object.assign({}, ElTree.props, {
        mode: {
            type: String,
            default: 'multiple'
        },
        showSearch: {
            type: Boolean,
            default: true
        }
    }),
    setup(props, { emit }: any) {
        return useTreeProps(props, emit, ElTree)
    },
    render() {
        const slots: any = this.$slots
        return <section class="manage-pc-tree-page">
            {this.showSearch && <header>
                <el-input suffix-icon="el-icon-search" size="small" placeholder={t('please.input.something')} />
            </header>}
            <ElTree
                {...this.treeProps}
                class={{
                    single: this.mode === 'single'
                }}
            >
                {
                    {
                        default: ({ node, data }: any) =>
                            isFunction(slots.node) ? slots.node({ node, data }) : defaultTreeNode(node, data)
                    }
                }
            </ElTree>
        </section>
    }
})

export default Tree