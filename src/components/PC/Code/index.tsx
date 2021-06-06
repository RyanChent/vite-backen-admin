import { defineComponent, ref, Transition } from 'vue'
import { isFunction } from '@/utils/types'
import { copyContent } from '@/utils/dom'
import './style'

const Code = defineComponent({
    name: 'CodePreview',
    componentName: 'ManageCodePreview',
    setup() {
        return {
            visibleCode: ref<boolean>(false),
            height: ref<number>(0),
            code: ref<any>(null),
            enterCode: ref<boolean>(false)
        }
    },
    render() {
        const slots: any = this.$slots
        return <section
            class="manage-code-preview"
            onMouseover={() => this.enterCode = true}
            onMouseout={() => this.enterCode = false}
        >
            <div class="preview">
                {isFunction(slots.default) && slots.default()}
            </div>
            <div
                class="code"
                style={{ height: `${this.height}px` }}
                ref={(el: any) => el && (this.code = el)}
                onContextmenu={(e: MouseEvent) => {
                    e.stopPropagation()
                    e.preventDefault()
                }}
            >
                {isFunction(slots.code) && slots.code()}
            </div>
            <footer
                class="code-button"
                onClick={() => {
                    this.visibleCode = !this.visibleCode
                    if (this.visibleCode) {
                        this.height = parseInt(window.getComputedStyle(this.code.querySelector('pre')).height)
                    } else {
                        this.height = 0
                    }
                }}
            >
                <el-button
                    type="text"
                    icon={this.visibleCode ? 'el-icon-caret-top' : "el-icon-caret-bottom"}
                >
                    <Transition enterActiveClass="animated fadeIn" leaveActiveClass="animated fadeOut">
                        {this.enterCode && <span>{this.visibleCode ? '隐藏' : '显示'}代码</span>}
                    </Transition>
                </el-button>
                {this.visibleCode &&
                    <el-button
                        type="text"
                        icon="el-icon-document-copy"
                        class="copy-button"
                        onClick={async (e: MouseEvent) => {
                            e.stopPropagation()
                            const original = slots.code()[0].el.innerText
                            const copyText = `${original}\n——————————————\n作者：JarryChen\n原文：${location.href}\n著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`
                            await copyContent(copyText);
                            (this as any).$message.success('复制成功')
                        }}
                    >
                        复制代码片段
                </el-button>
                }
            </footer>
        </section>
    }
})

export default Code