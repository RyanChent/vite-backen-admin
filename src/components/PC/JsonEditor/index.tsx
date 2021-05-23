import { defineComponent, ref } from 'vue'
import { objectToArrayforTree, objectToString } from '@/utils/data.ts'
import { trueType } from '@/utils/types.ts'
import { t } from '@/lang/index.ts'
import _ from 'lodash'
import './style.less'

const valueType = [
    {
        label: 'String',
        value: 'String'
    },
    {
        label: 'Number',
        value: 'Number'
    },
    {
        label: 'Symbol',
        value: 'Symbol'
    },
    {
        label: 'Boolean',
        value: 'Boolean'
    },
    {
        label: 'Function',
        value: 'Function'
    },
    {
        label: 'Array',
        value: 'Array'
    },
    {
        label: 'Object',
        value: 'Object'
    }
]

const useRenderJson = (props: any) => {
    const jsonString = ref<any>(objectToString(props.json))
    const treeData = ref<any>([
        {
            label: '{',
            key: 'root',
            type: 'Object',
            children: Object.keys(props.json).map(prop => objectToArrayforTree(props.json, prop, `root.${prop}`))
        },
        {
            label: '}',
            key: '}'
        }
    ]
    )
    // 值变动时响应方法
    const componentOnChange = (prop: any, propKey: any) => {
        const originKey = prop.key.replace('root.', '')
        new Function('obj', 'key', 'value', `obj.${originKey} = value`)(props.json, originKey, prop[propKey])
        props.showJson && _.debounce(() => {
            jsonString.value = objectToString(props.json)
        }, 600)()
    }
    // 按数据类型返回对应组件
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
                    onClick={(e: MouseEvent) => e.stopPropagation()}
                    onInput={() => componentOnChange(prop, propKey)}
                />
            case 'Boolean':
                return <el-radio-group v-model={prop[propKey]} onChange={() => componentOnChange(prop, propKey)}>
                    <el-radio label={true} >{t('true')}</el-radio>
                    <el-radio label={false} >{t('false')}</el-radio>
                </el-radio-group>
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
                    onClick={(e: MouseEvent) => e.stopPropagation()}
                    onInput={() => componentOnChange(prop, propKey)}
                />
        }
    }
    // 添加字段
    const addProperty = (parent: any, node: any) => {
        if (Array.isArray(parent.children)) {
            const obj: any = {
                value: '',
                type: 'String'
            }
            if (parent.type === 'Array') {
                obj.label = parent.children.length
                obj.key = parent.key + `[${obj.label}]`
                parent.desc && (parent.desc = `Array(${obj.label + 1})`)
            }
            if (parent.type === 'Object') {
                obj.label = 'a'
                obj.key = parent.key + `.a`
            }
            parent.children.push(obj)
        }

        if (node.expanded === false) {
            node.expanded = true
        }
    }
    // 删除字段
    const removeProperty = (parent: any, key: any) => {
        const keyIndex = (parent.children || parent).findIndex((item: any) => item.key === key)
        if (keyIndex > -1) {
            (parent.children || parent).splice(keyIndex, 1)
        }

        if (parent.type === 'Array') {
            parent.desc && (parent.desc = `Array(${parent.children.length})`)
        }

        new Function('obj', 'key', `delete obj.${key.replace('root.', '')}`)(props.json, key.replace('root.', ''))
        props.showJson && _.debounce(() => jsonString.value = objectToString(props.json), 600)()

    }
    // 修改字段key
    const changePropertyKey = (value: any, node: any, data: any) => {
        const { data: parentData } = node.parent
        new Function('obj', 'key', `delete obj.${data.key.replace('root.', '')}`)(props.json, data.key.replace('root.', ''))
        if (parentData) {
            parentData.type === 'Array' && (data.key = `${data.key.slice(0, data.key.lastIndexOf('[') + 1)}${value}]`)
            parentData.type === 'Object' && (data.key = `${data.key.slice(0, data.key.lastIndexOf('.') + 1)}${value}`)
        }
        new Function('obj', 'key', 'value', `obj.${data.key.replace('root.', '')} = value`)(props.json, data.key.replace('root.', ''), data.value)
        data.label = value
        props.showJson && _.debounce(() => jsonString.value = objectToString(props.json), 600)()
    }
    return {
        treeData,
        componentType,
        jsonString,
        addProperty,
        removeProperty,
        changePropertyKey
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
        const { treeData, componentType, jsonString, addProperty, removeProperty, changePropertyKey } = useRenderJson(props)
        return {
            treeData,
            componentType,
            jsonString,
            addProperty,
            removeProperty,
            changePropertyKey
        }
    },
    render() {
        return <section class="manage-json-render">
            <el-tree
                data={this.treeData}
                node-key="key"
                default-expanded-keys={['root']}
                empty-text="暂无数据"
                highlight-current
                check-on-click-node
                auto-expand-parent
            >
                {{
                    default: ({ node, data }: any) => <div class="json-row">
                        <span class="json-key">
                            {!['root', '}'].includes(data.key) ? <>
                                <el-input
                                    size="mini"
                                    modelValue={data.label}
                                    readonly={node.parent.data.type === 'Array'}
                                    onClick={(e: MouseEvent) => e.stopPropagation()}
                                    onInput={(value: any) => this.changePropertyKey(value, node, data)}
                                    clearable
                                />：
                            </> : data.label}
                        </span>
                        {!['root', '}'].includes(data.key) && <div class="json-value">
                            {
                                data.desc ? <span style="font-style: italic;">{data.desc}</span> : this.componentType(data, 'value')
                            }
                            <el-select
                                v-model={data.type}
                                style="margin-left: 10px; width: 150px"
                                size="mini"
                                placeholder={t('please.select.something')}
                            >
                                {
                                    valueType.map((item) =>
                                        <el-option
                                            label={t(item.label)}
                                            value={item.value}
                                            key={item.value}
                                        />
                                    )
                                }
                            </el-select>
                            {['Array', 'Object'].includes(data.type) && <el-button
                                type="text"
                                icon="el-icon-circle-plus-outline"
                                style="color: #67c23A"
                                title="添加属性"
                                onClick={(e: MouseEvent) => {
                                    e.stopPropagation()
                                    this.addProperty(data, node)
                                }}
                            />
                            }
                            <el-button
                                type="text"
                                icon="el-icon-remove-outline"
                                title='移除属性'
                                style="color: #F56C6C"
                                onClick={(e: MouseEvent) => {
                                    e.stopPropagation()
                                    this.removeProperty(node.parent.data, data.key)
                                }}
                            />
                        </div>
                        }
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
                    autosize={{ minRows: 28, maxRows: 28 }}
                />
            </div>
            }
        </section>
    }
})

export default JsonEditor