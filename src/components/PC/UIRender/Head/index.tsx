import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import './style.less'
import GenerateFile from '@/utils/file.ts'
let generate: any
const UIRenderHead = defineComponent({
    name: 'UIRenderHead',
    componentName: 'ManageUIRenderHead',
    props: {
        renderStr: {
            type: Array,
            default: () => []
        },
        importStr: {
            type: Array,
            default: () => []
        }
    },
    setup() {
        const transferRenderStr = (renderArray: any): string => {
            let str = ''
            renderArray.forEach((component: any) => {
                if (Array.isArray(component.children)) {
                    str += (component.source || '').replace(/slots/g, transferRenderStr(component.children))
                } else {
                    str += (component.source || '').replace(/>slots<\/?[^>]+>/g, `/>`)
                }
                str += `\n`
            })
            return str
        }
        const addBracketsSpace = (str: string, symbol: string): string => {
            switch (symbol) {
                case '(': return str.replaceAll('(', '( ').replaceAll(')', ' )');
                case '{': return str.replaceAll('{', '{ ').replaceAll('}', ' }');
                case '[': return str.replaceAll('[', '[ ').replaceAll(']', ' ]');
                default: return str
            }
        }
        onMounted(() => {
            generate = new GenerateFile()
        })
        onBeforeUnmount(() => {
            generate = null
        })
        return {
            transferRenderStr,
            addBracketsSpace
        }
    },
    render() {
        return <header class="ui-render-head-tool">
            <div>
                <el-button type="primary">新建</el-button>
            </div>
            <div>
                <el-button >重置</el-button>
                <el-button
                    type="success"
                    onClick={() => generate.generateFile({
                        renderStr: this.transferRenderStr(this.renderStr),
                        importStr: this.importStr.map((str: any) => str.includes('{') ? this.addBracketsSpace(str, '{') : str).join('\n'),
                        componentStr: this.importStr.map((str: any) =>
                            `${(str || '').split(' ')[1].replaceAll('{', '').replaceAll('}', '')}`).join(',\n')
                    })}
                >
                    保存源码
            </el-button>
                <el-button
                    type="primary"
                    onClick={() => generate.generateFile({
                        domstr: document.querySelector('.ui-render-content .render-panel')?.innerHTML,
                        composition: false,
                        source: false
                    })}
                >
                    保存构建后代码
            </el-button>
            </div>
        </header>
    }
})

export default UIRenderHead