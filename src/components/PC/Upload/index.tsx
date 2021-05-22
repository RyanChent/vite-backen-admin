import { computed, defineComponent, TransitionGroup } from 'vue'
import ElUpload from 'element-plus/lib/el-upload'
import ElMessage from 'element-plus/lib/el-message'
import FileList from './List'
import _ from 'lodash'
import './style.less'
import { isNotEmptyString, isFunction } from '@/utils/types.ts'
import { downFile } from '@/utils/tool.ts'
import { downloadFile } from '@/api/tool.ts'

const changeSizeDesc = (filesize: number): string => {
    let num = 0
    while (filesize >= 2 ** 10) {
        filesize /= 2 ** 10
        num++
    }
    return `${filesize}${['b', 'kb', 'mb'][num]}`
}

const useHandleUpload = (props: any) => {
    const removeFile = (uid: any) => {
        const fileIndex = props.fileList.findIndex((item: any) => item && item.uid === uid)
        fileIndex > -1 && props.fileList.splice(fileIndex, 1)
    }
    const beforeUpload = (file: any) => new Promise((resolve, reject) => {
        if (props.filesize > 0) {
            const { filesize } = file
            if (filesize >= props.filesize) {
                ElMessage.error(`文件大小不能超过${changeSizeDesc(props.filesize)}`)
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
    __file: '@PC/Upload/index.tsx',
    components: {
        FileList
    },
    props: Object.assign({}, ElUpload.props, {
        filesize: {
            type: Number,
            default: 0
        },
        customClass: {
            type: String,
            default: 'manage-pc-upload'
        }
    }),
    setup(props, { emit }: any) {
        const { uploadProps } = useProps(props)
        const download = ({ url }: any) => {
            if (isNotEmptyString(url)) {
                downloadFile({
                    name: url.split('/').pop()
                }).then((res: any) => {
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
        return <section class={this.customClass}>
            <el-upload {...this.uploadProps} class="manage-pc-upload-component">
                {
                    Object.assign({
                        default: () => isFunction(slots.default) ? slots.default() : <>
                            <i class="el-icon-upload" />
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </>,
                        tip: () => isFunction(slots.tip) ? slots.tip() :
                            <div class="el-upload__tip">
                                {isNotEmptyString(this.accept) && `只能上传${this.accept.replace(/,./g, '/')}文件，`}
                                {this.filesize > 0 && `文件大小不可超过${changeSizeDesc(this.filesize)}`}
                            </div>
                    }, isFunction(slots.file) && {
                        file: ({ file }: any) => slots.file({
                            file,
                            download: this.download,
                            remove: this.uploadProps.onRemove
                        })
                    })
                }
            </el-upload>
            {!this.uploadProps.showFileList && (isFunction(slots.filelist) ? slots.filelist() :
                <file-list
                    fileList={this.fileList}
                    onDownload={this.download}
                    onRemove={this.uploadProps.onRemove}
                />)
            }
        </section>
    }
})

export default Upload