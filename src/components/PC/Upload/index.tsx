import { computed, defineComponent, TransitionGroup } from 'vue'
import ElUpload from 'element-plus/lib/el-upload'
import ElMessage from 'element-plus/lib/el-message'
import _ from 'lodash'
import './style.less'
import { isNotEmptyString, isFunction } from '@/utils/types.ts'
import { downFile } from '@/utils/tool.ts'
import { downloadFile } from '@/api/tool.ts'

const changeSizeDesc = (size: number): string => {
    let num = 0
    while (size >= 2 ** 10) {
        size /= 2 ** 10
        num++
    }
    return `${size}${['b', 'kb', 'mb'][num]}`
}

const useHandleUpload = (props: any) => {
    const removeFile = (uid: any) => {
        const fileIndex = props.fileList.findIndex((item: any) => item && item.uid === uid)
        fileIndex > -1 && props.fileList.splice(fileIndex, 1)
    }
    const beforeUpload = (file: any) => new Promise((resolve, reject) => {
        if (props.size > 0) {
            const { size } = file
            if (size >= props.size) {
                ElMessage.error(`文件大小不能超过${changeSizeDesc(props.size)}`)
                removeFile(file.uid)
                return reject()
            }
        }
        if (isNotEmptyString(props.accept)) {
            const suffix = file.name.slice(file.name.lastIndexOf('.') + 1)
            if (!props.accept.includes(suffix)) {
                ElMessage.error(`上传文件格式必须为${props.accept.replace(/,./g, '/')}`)
                removeFile(file.uid)
                return reject()
            }
        }
        isFunction(props.beforeUpload) && props.beforeUpload(file)
        return isNotEmptyString(props.action) ? resolve(null) : reject()
    })
    const onChange = (file: any, fileList: Array<any>) => {
        const fileIndex = props.fileList.findIndex((item: any) => item && item.uid === file.uid)
        if (file.response) {
            if (file.response.success) {
                file.percentage = 100
                fileIndex > -1 && (props.fileList[fileIndex] = file)
            } else {
                ElMessage.error('上传失败，请重试')
                fileIndex > -1 && props.fileList.splice(fileIndex, 1)
            }
        } else {
            if (file.status === 'fail') {
                ElMessage.error('上传失败，请重试')
                fileIndex > -1 && props.fileList.splice(fileIndex, 1)
            }
            if (fileIndex < 0 && file.status === 'ready') {
                props.fileList.push(file)
            }
        }
        isFunction(props.onChange) && props.onChange(file, fileList)
    }
    const onRemove = (file: any, fileList: Array<any>) => {
        removeFile(file.uid)
        isFunction(props.onRemove) && props.onRemove(file, fileList)
    }
    return {
        beforeUpload,
        onChange,
        onRemove
    }
}

const useProps = (props: any) => {
    const uploadProps = computed(() => Object.assign({},
        _.pick(props, Object.keys(ElUpload.props)),
        useHandleUpload(props)
    ))
    return {
        uploadProps
    }
}

const Upload = defineComponent({
    name: 'Upload',
    componentName: 'ManagePCUpload',
    props: Object.assign({}, ElUpload.props, {
        size: {
            type: Number,
            default: 0
        }
    }),
    setup(props, { emit }: any) {
        const { uploadProps } = useProps(props)
        const download = ({ url }: any) => {
            if (isNotEmptyString(url)) {
                downloadFile({
                    name: url.split('/').pop()
                }).then((res: any) => {
                    console.log(res)
                    if (res.data) {
                        downFile(res.data, url.split('/').pop())
                    }
                })
            } else {

            }
        }
        return {
            uploadProps,
            download
        }
    },
    render() {
        const slots: any = this.$slots
        return <section class="manage-pc-upload">
            <el-upload {...this.uploadProps} class="manage-pc-upload-component">
                {
                    {
                        default: () => <>
                            <i class="el-icon-upload" />
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </>,
                        tip: () => isFunction(slots.tip) ? slots.tip() : <div class="el-upload__tip">只能上传{this.accept.replace(/,./g, '/')}文件，且不超过{changeSizeDesc(this.size)}</div>
                    }
                }
            </el-upload>
            {!this.uploadProps.showFileList && (isFunction(slots.filelist) ? slots.filelist() : <ul class="manage-pc-upload-list">
                <TransitionGroup enterActiveClass="animated fadeInDown" leaveActiveClass="animated fadeOutUp">
                    {this.fileList.map((file: any) => <li key={file.uid}>
                        <section class="upload-file-content">
                            <div>
                                <el-button
                                    type="text"
                                    onClick={() => this.download(file.response?.result || {})}>
                                    {file.response?.name || file.raw.name}
                                </el-button>
                            </div>
                            <div>
                                <el-button
                                    type="primary"
                                    icon="el-icon-download"
                                    size="mini"
                                    circle
                                    onClick={() => this.download(file.response?.result || {})}
                                />
                                <el-button
                                    type="danger"
                                    icon="el-icon-delete"
                                    size="mini"
                                    circle
                                    onClick={() => this.uploadProps.onRemove(file, [])}
                                />
                            </div>
                        </section>
                        <el-progress percentage={file.percentage} status="success" style={{ display: file.percentage >= 100 && 'none' }} />
                    </li>)}
                </TransitionGroup>
            </ul>)}
        </section>
    }
})

export default Upload