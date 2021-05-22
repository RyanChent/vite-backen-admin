import { defineComponent, ref } from 'vue'
import { objectToArrayforTree } from '@/utils/data.ts'
import { trueType } from '@/utils/types.ts'
import { t } from '@/lang/index.ts'
import './style.less'

const useRenderJson = (props: any) => {
    const treeData = ref<any>(Object.keys(props.json).map(prop => objectToArrayforTree(props.json, prop, `root.${prop}`)))
    const componentType = (prop: any, propKey: any) => {
        switch (trueType(prop[propKey])) {
            case 'String':
            case 'Number':
            case 'Symbol':
                return <el-input
                    v-model={prop[propKey]}
                    clearable
                    size="mini"
                    placeholder={t('please.input.something')}
                />
            case 'Function':
                return <el-input
                    v-model={prop[propKey]}
                    clearable
                    type="textarea"
                    autosize={{
                        minRows: 6,
                        maxRows: 12
                    }}
                    placeholder={t('please.input.something')}
                />
        }
    }
    return {
        treeData,
        componentType
    }
}

const JsonEditor = defineComponent({
    name: 'JsonEditor',
    componentName: 'ManageJsonEditor',
    props: {
        json: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        const { treeData, componentType } = useRenderJson(props)
        return {
            treeData,
            componentType
        }
    },
    render() {
        return <section class="manage-json-render">
            <el-tree
                data={this.treeData}
                node-key="key"
                default-expand-all
                draggable
                empty-text="暂无数据"
                highlight-current
                check-on-click-node
                auto-expand-parent
            >
                {{
                    default: ({ node, data }: any) => <div class="json-row">
                        <span class="json-key">
                            {data.label}：
                        </span>
                        <div class="json-value">
                            {
                                data.desc ? <span style="font-style: italic">{data.desc}</span> : this.componentType(data, 'value')
                            }
                        </div>
                    </div>
                }}
            </el-tree>
        </section>
    }
})

export default JsonEditor