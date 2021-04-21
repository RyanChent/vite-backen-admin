import { defineComponent, h } from 'vue'
import './style.less'

const Dialogs = defineComponent({
    name: 'Dialogs',
    componentName: 'ManageDialogs',
    setup(props) {
        return () => <el-dialog
            title="测试弹框"
            close-on-click-modal={false}
            close-on-press-escape={false}
            visible={true}>
            <div>123</div>
        </el-dialog>
    }
})

export default Dialogs