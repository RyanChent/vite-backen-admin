import { defineComponent, onBeforeUnmount } from 'vue'
import './style.less'
import GenerateFile from '@/utils/file.ts'
let generate = new GenerateFile()
const UIRenderHead = defineComponent({
    name: 'UIRenderHead',
    componentName: 'ManageUIRenderHead',
    setup() {
        onBeforeUnmount(() => {
            generate = null
        })
        return {

        }
    },
    render() {
        return <header class="ui-render-head-tool">
            <el-button >重置</el-button>
            <el-button
                type="success"
                onClick={() => generate.generateFile()}
            >
                保存源码
            </el-button>
            <el-button
                type="primary"
                onClick={() => generate.generateFile({
                    composition: false,
                    source: false
                })}
            >
                保存构建后代码
            </el-button>
        </header>
    }
})

export default UIRenderHead