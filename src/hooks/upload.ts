import { ref, computed, onMounted } from 'vue'
import { pick } from '@/utils/props'
import { isNotEmptyString, isFunction } from '@/utils/types'
import { Toast } from 'vant'

const getFileDesc = (maxSize: number) => {
    let num = 0
    while (maxSize >= 2 ** 10 && num < 5) {
        maxSize = Math.floor(maxSize / 2 ** 10)
        num += 1
    }
    return `${maxSize}${['kb', 'mb', 'gb', 'tb'][num]}`
}

const handleMobileUpload = (upload: any, emit: any) => {
    const beforeRead = (file: any, detail: any) => new Promise((resolve, reject) => {
        const { type, size } = file
        if (isNotEmptyString(upload.accept)) {
            const [main, sub] = type.split('/')
            const acceptType = upload.accept.split(',')
            for (let i = 0; i < acceptType.length; i++) {
                let flag = true
                const item = acceptType[i]
                if (item.includes('/')) {
                    const [amain, asub] = item.split('/')
                    flag = amain === main && (asub === '*' ? true : asub === sub)
                } else {
                    flag = sub === item.slice(1)
                }
                if (!flag) {
                    Toast(`上传文件格式必须为${item}`)
                    return reject()
                }
            }
        }

        if (size >= upload.maxSize) {
            Toast(`上传文件不能超过${getFileDesc(upload.maxSize)}`)
            return reject()
        }
        isFunction(upload.beforeRead) && upload.beforeRead(file, detail)
        resolve(null)
    })

    const afterRead = (file: any, detail: any) => {
        isFunction(upload.afterRead) && upload.afterRead(file, detail)
    }

    const beforeDelete = (file: any, detail: any) => new Promise((resolve, reject) => {
        if (upload.fileList.value[detail.index]) {
            upload.fileList.value.splice(detail.index, 1)
            isFunction(upload.beforeDelete) && upload.beforeDelete(file, detail)
            return resolve(null)
        } else {
            return reject()
        }
    })

    const onOversize = (file: any, detail: any) => emit('oversize', file, detail)
    const onClickPreview = (file: any, detail: any) => emit('click-preview', file, detail)
    const onClosePreview = () => emit('close-preview')
    const onDelete = (file: any, detail: any) => emit('delete', file, detail)

    return {
        beforeRead,
        afterRead,
        beforeDelete,
        onOversize,
        onClickPreview,
        onClosePreview,
        onDelete
    }
}

export const useMobileUpload = (props: any, emit: any, component: any) => {
    const keys = Object.keys(component.props).filter((key: string) => key !== 'modelValue')
    const fileList = computed({
        get() {
            return props.modelValue
        },
        set(value) {
            emit('update:modelValue', value)
        }
    })

    const upload = { ...pick(props, ['beforeRead', 'afterRead', 'beforeDelete', 'accept', 'maxSize']), fileList }

    const uploadProps = computed(() =>
        Object.assign(
            {},
            pick(props, keys),
            handleMobileUpload(upload, emit)
        )
    )

    const fileRef = ref<any>(null)

    onMounted(() => {
        emit('getFile', fileRef)
    })

    return {
        uploadProps,
        fileList,
        fileRef
    }
}