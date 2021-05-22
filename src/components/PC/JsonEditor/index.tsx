import { defineComponent, ref } from 'vue'
import { objectToArrayforTree, objectToString } from '@/utils/data.ts'
import { trueType } from '@/utils/types.ts'
import { t } from '@/lang/index.ts'
import _ from 'lodash'
import './style.less'

const useRenderJson = (props: any) => {
    const jsonString = ref<any>(objectToString(props.json))
    const treeData = ref<any>(Object.keys(props.json).map(prop => objectToArrayforTree(props.json, prop, `${prop}`)))
    const componentType = (prop: any, propKey: any) => {
        switch (prop.type || trueType(prop[propKey])) {
            case 'String':
            case 'Number':
            case 'Symbol':
                return <el-input
                    v-model={prop[propKey]}
                    clearable
                    size="mini"
                    placeholder={t('please.input.something')}
                    onInput={_.debounce(() => {
                        eval(`props.json.${prop.key}=prop[propKey]`)
                        jsonString.value = objectToString(props.json)
                    }, 600)}
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
                    onInput={_.debounce(() => {
                        eval(`props.json.${prop.key}=prop[propKey]`)
                        jsonString.value = objectToString(props.json)
                    }, 600)}
                />
        }
    }
    return {
        treeData,
        componentType,
        jsonString
    }
}

const JsonEditor = defineComponent({
    name: 'JsonEditor',
    componentName: 'ManageJsonEditor',
    props: {
        json: {
            type: Object,
            default: () => ({})
        },
        showJson: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const { treeData, componentType, jsonString } = useRenderJson(props)
        return {
            treeData,
            componentType,
            jsonString
        }
    },
    render() {
        return <section class="manage-json-render">
            <el-tree
                data={this.treeData}
                node-key="key"
                default-expand-all
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
            {this.showJson && <div class="manage-json-show"
                onContextmenu={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                }}
            >
                <el-input
                    type="textarea"
                    modelValue={this.jsonString}
                    readOnly
                    autosize={{ minRows: 15, maxRows: 28 }}
                />
            </div>
            }
        </section>
    }
})

export default JsonEditor