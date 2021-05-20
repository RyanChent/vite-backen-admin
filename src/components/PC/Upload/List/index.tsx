import { defineComponent, ref, TransitionGroup } from 'vue'
import Preview from '../Preview'
import suffixIcon from '@/data/suffix.json'
const UploadList = defineComponent({
    name: 'UploadList',
    componentName: 'ManageUploadList',
    __file: '@PC/Upload/List/index.tsx',
    components: {
        Preview
    },
    props: {
        fileList: {
            type: Array,
            default: () => []
        }
    },
    setup() {
        const current = ref<any>({})
        return {
            current
        }
    },
    render() {
        return <section>
            <ul class="manage-pc-upload-list">
                <TransitionGroup enterActiveClass="animated fadeInDown" leaveActiveClass="animated fadeOutUp">
                    {this.fileList.length > 0 && this.fileList.map((file: any) => <li key={file.uid}>
                        <section class="upload-file-content">
                            <div>
                                <el-button
                                    type="text"
                                    onClick={() => this.$emit('download', file.response?.result || {})}>
                                    <i class={['iconfont', `${suffixIcon[file.raw.name.split('.').pop()] || 'vite-icon-file'}`]}
                                        style="padding-right: 8px; font-size: 1.3rem" />
                                    {file.response?.name || file.raw.name}
                                </el-button>
                            </div>
                            <div>
                                {file.response && <el-button
                                    type="success"
                                    icon="el-icon-view"
                                    size="mini"
                                    circle
                                    title="预览"
                                    onClick={() => { this.current = file.response.result }}
                                />}
                                <el-button
                                    type="primary"
                                    icon="el-icon-download"
                                    size="mini"
                                    title="下载"
                                    circle
                                    onClick={() => this.$emit('download', file.response?.result || {})}
                                />
                                <el-button
                                    type="danger"
                                    icon="el-icon-delete"
                                    size="mini"
                                    title="删除"
                                    circle
                                    onClick={() => this.$emit('remove', file, [])}
                                />
                            </div>
                        </section>
                        <el-progress percentage={file.percentage} status="success" style={{ display: file.percentage >= 100 && 'none' }} />
                    </li>)}
                </TransitionGroup>
            </ul>
            <Preview v-model={[this.current, 'file']} />
        </section>
    }
})

export default UploadList