import { defineComponent, ref } from 'vue'
import { objectToArrayforTree, objectToString } from '@/utils/data'
import { trueType } from '@/utils/types'
import { t } from '@/lang'
import _ from 'lodash'
import './style'

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
    const jsonKey = ref<any>(Object.keys(props.json).map(key => `root.${key}`))
    const jsonString = ref<any>(objectToString(props.json))
    const treeData = ref<any>([
        {
            label: '{',
            key: 'root',
            type: 'Object',
            children: Object.keys(props.json).map(prop => objectToArrayforTree(props.json, prop, `root.${prop}`, jsonKey.value))
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
        const obj: any = {
            value: '',
            type: 'String'
        }
        if (Array.isArray(parent.children)) {
            if (parent.type === 'Array') {
                obj.label = parent.children.length
                obj.key = parent.key + `[${obj.label}]`
                parent.desc && (parent.desc = `Array(${obj.label + 1})`)
            }
            if (parent.type === 'Object') {
                obj.label = 'a'
                obj.key = parent.key + `.a`
            }
        }
        if (!jsonKey.value.includes(obj.key)) {
            jsonKey.value.push(obj.key)
            const originKey = obj.key.replace('root.', '')
            if (originKey !== '') {
                new Function('obj', 'key', 'value', `obj.${originKey} = value`)(props.json, originKey, obj.value)
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
            jsonKey.value.includes(key) && jsonKey.value.splice(jsonKey.value.indexOf(key), 1)
            new Function('obj', 'key', `delete obj.${key.replace('root.', '')}`)(props.json, key.replace('root.', ''))
        }

        if (parent.type === 'Array') {
            parent.desc && (parent.desc = `Array(${parent.children.length})`)
        }

        props.showJson && _.debounce(() => jsonString.value = objectToString(props.json), 600)()

    }
    // 修改字段key
    const propertyKeyChange = (value: any, node: any, data: any) => {
        let originKey: any
        const { data: parentData } = node.parent
        if (jsonKey.value.includes(data.key)) {
            jsonKey.value.splice(jsonKey.value.indexOf(data.key), 1)
        }
        originKey = data.key.replace('root.', '')
        if (originKey !== '') {
            new Function('obj', 'key', `delete obj.${originKey}`)(props.json, originKey)
        }
        if (parentData) {
            if (parentData.type === 'Array') {
                data.key = `${data.key.slice(0, data.key.lastIndexOf('[') + 1)}${value}]`
            }
            if (parentData.type === 'Object') {
                data.key = `${data.key.slice(0, data.key.lastIndexOf('.') + 1)}${value}`
            }
        }
        originKey = data.key.replace('root.', '')
        new Function('obj', 'key', 'value', `obj.${originKey} = value`)(props.json, originKey, data.value)
        data.label = value
        if (!jsonKey.value.includes(data.key)) {
            jsonKey.value.push(data.key)
        }
        props.showJson && _.debounce(() => jsonString.value = objectToString(props.json), 600)()
    }
    // 值改变类型时
    const propertyTypeChange = (data: any) => {
        const originKey = data.key.replace('root.', '')
        switch (data.type) {
            case 'Array':
            case 'Object':
                if (Array.isArray(data.children)) {
                    jsonKey.value = jsonKey.value.filter((key: string) => !data.children.map((item: any) => item.key).includes(key))
                }
                delete data.value
                data.children = []
                data.desc = data.type === 'Array' ? 'Array(0)' : 'Object(0)'
                new Function('obj', 'key', 'type', `obj.${originKey} = type === 'Array' ? [] : {} `)(props.json, originKey, data.type)
                break;
            default: data.value = ''
                delete data.desc
                delete data.children
                new Function('obj', 'key', `obj.${originKey} = ''`)(props.json, originKey)
                break;
        }
        props.showJson && _.debounce(() => jsonString.value = objectToString(props.json), 600)()
    }
    // 拖拽节点放下时触发 //暂只能同级，无法越级交换
    const dragPropertyDrop = (drag: any, drop: any, position: string, e: DragEvent) => {
        switch (position) {
            case 'before':
                break;
            case 'after':
                break;
            case 'inner':
                break;
        }
    }
    return {
        treeData,
        componentType,
        jsonString,
        addProperty,
        removeProperty,
        propertyKeyChange,
        propertyTypeChange,
        dragPropertyDrop
    }
}

const propertyNode = (props: any, node: any, data: any) => <div class="json-row">
    <span class="json-key">
        {!['root', '}'].includes(data.key) ? <>
            <el-input
                size="mini"
                modelValue={data.label}
                readonly={node.parent.data.type === 'Array'}
                onClick={(e: MouseEvent) => e.stopPropagation()}
                onInput={(value: any) => props.propertyKeyChange(value, node, data)}
                clearable
            />：
                            </> : data.label}
    </span>
    <div class="json-value">
        {!['root', '}'].includes(data.key) ? <>
            {
                data.desc ? <span class="primary" style="font-style: oblique; padding-top: 2px">{data.desc}</span> : props.componentType(data, 'value')
            }
            <el-select
                v-model={data.type}
                style="margin-left: 10px; width: 150px"
                size="mini"
                onChange={() => props.propertyTypeChange(data)}
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
                    props.addProperty(data, node)
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
                    props.removeProperty(node.parent.data, data.key)
                }}
            />
        </> : data.key === 'root' && <div class="json-value">
            <el-button
                type="text"
                icon="el-icon-circle-plus-outline"
                style="color: #67c23A"
                title="添加属性"
                onClick={(e: MouseEvent) => {
                    e.stopPropagation()
                    props.addProperty(data, node)
                }}
            />
        </div>}
    </div>
</div>

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
        },
        draggable: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        return useRenderJson(props)
    },
    render() {
        return <section class="manage-json-render">
            <el-tree
                data={this.treeData}
                node-key="key"
                default-expanded-keys={['root']}
                draggable={this.draggable}
                highlight-current
                auto-expand-parent
                allow-drag={(node: any) =>
                    !['root', '}'].includes(node.data.key) &&
                    node.parent?.data?.type !== 'Array'
                }
                allow-drop={(drag: any, drop: any, type: string) =>
                    !['root', '}'].includes(drop.data.key) &&
                    drag.parent?.data?.key === drop.parent?.data?.key &&
                    type !== 'inner'
                }
                onNodeDrop={this.dragPropertyDrop}
            >
                {
                    {
                        default: ({ node, data }: any) => propertyNode(this, node, data)
                    }
                }
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