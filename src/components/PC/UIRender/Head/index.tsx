import { defineComponent, onBeforeUnmount } from 'vue'
import './style.less'
import GenerateFile from '@/utils/file.ts'
let generate = new GenerateFile()
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
                    str += component.source.replace(/slots/g, '')
                }
                str += `\n`
            })
            return str
        }
        onBeforeUnmount(() => {
            generate = null
        })
        return {
            transferRenderStr
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
                        importStr: this.importStr.join('\n'),
                        componentStr: this.importStr.map((str: any) => (str || '').split(' ')[1]).join('\n')
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