import { defineComponent } from 'vue'
import ElTree from 'element-plus/lib/el-tree'
import { isFunction } from '@/utils/types'
import { useTreeProps, useHandleTree, useHandleTreeNode } from '@/hooks/tree'
import { t } from '@/lang'
import './style'

const defaultTreeNode = function (this: any, node: any, data: any) {
    if (!data.hasOwnProperty('editLabel')) {
        data.editLabel = false
    }
    return <div class="node-content">
        <span class={{
            label: true,
            readonly: !this.editable || !data.editLabel
        }}
        >
            {isFunction(this.$slots.node)
                ? this.$slots.node({ node, data })
                : <el-input
                    v-model={data[this.props.label]}
                    placeholder={t('please.input.something')}
                    size="mini"
                    onClick={(e: MouseEvent) => {
                        e.stopPropagation()
                        data.editLabel = true
                    }}
                    onBlur={() => data.editLabel = false}
                    readonly={!this.editable || !data.editLabel}
                />}
        </span>
        {this.editable && <span class="edit-buttons">
            <el-dropdown
                onCommand={(command: string) => this.addTreeNode(node, data, command)}
                trigger="click"
            >
                {
                    {
                        default: () => <el-button icon="el-icon-plus" type="text" title="添加节点" onClick={(e: MouseEvent) => e.stopPropagation()} />,
                        dropdown: () => <el-tooltip placement="right" effect="light" >
                            {{
                                default: () => <el-dropdown-menu>
                                    {
                                        this.treeNodeAdd.map((addAction: any) =>
                                            <el-dropdown-item
                                                command={addAction.command}
                                                key={addAction.command}
                                                icon={addAction.icon}
                                            >
                                                {addAction.desc}
                                            </el-dropdown-item>
                                        )
                                    }
                                </el-dropdown-menu>,
                                content: () => <>
                                    <p class="flex-row" >
                                        <span>{t(this.nodeKey)}：</span>
                                        <el-input
                                            v-model={data[`new${this.nodeKey}`]}
                                            placeholder={t('please.input.something')}
                                            size="mini"
                                        />
                                    </p>
                                    <p class="flex-row">
                                        <span>{t(this.props.label)}：</span>
                                        <el-input
                                            v-model={data[`new${this.props.label}`]}
                                            placeholder={t('please.input.something')}
                                            size="mini"
                                        />
                                    </p>
                                </>
                            }}
                        </el-tooltip>
                    }
                }
            </el-dropdown>
            <el-button
                icon="el-icon-minus"
                type="text"
                title="移除节点"
                onClick={(e: MouseEvent) => this.removeTreeNode(e, node)}
            />
        </span>
        }
    </div>
}

const Tree = defineComponent({
    name: 'Tree',
    componentName: 'ManagePCTree',
    components: {
        ElTree
    },
    props: Object.assign({}, ElTree.props, {
        showSearch: {
            type: Boolean,
            default: false
        },
        single: {
            type: Boolean,
            default: false
        },
        editable: {
            type: Boolean,
            default: false
        }
    }),
    setup(props) {
        const { treeProps, treeRef, searchValue, topPopoverShow, newNode, addFirstLayerNode } = useTreeProps(props, ElTree)
        const { addTreeNode, treeNodeAdd, removeTreeNode } = useHandleTreeNode(props, treeRef)
        return {
            treeProps,
            treeRef,
            searchValue,
            addTreeNode,
            treeNodeAdd,
            removeTreeNode,
            topPopoverShow,
            newNode,
            addFirstLayerNode,
        }
    },
    render() {
        const slots: any = this.$slots
        return <section class="manage-pc-tree-page">
            <header class="manage-pc-tree-head">
                {
                    this.showSearch && <el-input
                        suffix-icon="el-icon-search"
                        size="small"
                        placeholder={t('please.input.something')}
                        v-model={this.searchValue}
                    />
                }
                <el-popover
                    v-model={[this.topPopoverShow, 'visible']}
                    trigger="click"
                    width='fit-content'
                    placement="right"
                    show-arrow={false}
                >
                    {
                        {
                            default: () => <>
                                <p class="flex-row" >
                                    <span>{t(this.nodeKey)}：</span>
                                    <el-input
                                        placeholder={t('please.input.something')}
                                        size="mini"
                                        v-model={this.newNode[this.nodeKey]}
                                    />
                                </p>
                                <p class="flex-row">
                                    <span>{t(this.props.label)}：</span>
                                    <el-input
                                        placeholder={t('please.input.something')}
                                        size="mini"
                                        v-model={this.newNode[this.props.label]}
                                    />
                                </p>
                                <p class="flex-row">
                                    <el-button
                                        type="success"
                                        size="mini"
                                        onClick={this.addFirstLayerNode}
                                    >
                                        确定
                                    </el-button>
                                </p>
                            </>,
                            reference: () => <el-button
                                type="success"
                                circle
                                style="min-height: 0"
                                icon="el-icon-plus"
                                size="mini"
                                title='添加节点'
                            />
                        }
                    }
                </el-popover>
            </header>
            <ElTree
                {...this.treeProps}
                class={{
                    single: this.single
                }}
                ref={(el: any) => el && (this.treeRef = el)}
                {...useHandleTree.call(this)}
            >
                {
                    {
                        default: ({ node, data }: any) =>
                            isFunction(slots.default)
                                ? slots.default({ node, data })
                                : defaultTreeNode.call(this, node, data)
                    }
                }
            </ElTree>
        </section>
    }
})

export default Tree