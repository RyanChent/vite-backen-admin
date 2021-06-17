import { ref, computed, onMounted, watch } from 'vue'
import { pick } from '../utils/props'
import { isNotEmptyString, isFunction } from '../utils/types'
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
  const beforeRead = (file: any, detail: any) =>
    new Promise((resolve, reject) => {
      const { type, size } = file
      if (isNotEmptyString(upload.accept)) {
        const [main, sub] = type.split('/')
        const invalidType = upload.accept.split(',').some((accept: string) => {
          let flag
          if (accept.includes('/')) {
            const [amain, asub] = accept.split('/')
            flag = amain === main && (asub === '*' ? true : asub === sub)
          } else {
            flag = sub === accept.slice(1)
          }
          return flag
        })
        if (!invalidType) {
          Toast(`上传文件格式必须为${upload.accept}`)
          return reject()
        }
      }

      if (size >= upload.maxSize) {
        Toast(`上传文件不能超过${getFileDesc(upload.maxSize)}`)
        return reject()
      }

      isFunction(upload.beforeRead) && upload.beforeRead(file, detail)
      resolve(null)
    })

  const afterRead = (res: any, detail: any) => {
    res.status = 'uploading'
    res.message = '上传中...'
    isFunction(upload.afterRead) && upload.afterRead(res, detail)
    if (isFunction(upload.httpRequest)) {
      const form = new FormData()
      form.append('file', res.file)
      Object.entries(upload.data).forEach(([key, value]: any) => {
        form.append(key, value)
      })
      upload
        .httpRequest(form)
        .then((data: any) => {
          res.status = ''
          res.message = ''
          res.content = data.url
          emit('success', res, detail)
        })
        .catch((err: any) => {
          if (err.isAxiosError) {
            res.status = ''
            res.message = ''
          } else {
            beforeDelete(res, detail)
          }
        })
    } else {
      setTimeout(() => {
        res.status = ''
        res.message = ''
      }, 1000)
    }
  }

  const beforeDelete = (file: any, detail: any) =>
    new Promise((resolve, reject) => {
      if (upload.fileList.value[detail.index]) {
        upload.fileList.value.splice(detail.index, 1)
        isFunction(upload.beforeDelete) && upload.beforeDelete(file, detail)
        return resolve(null)
      } else {
        return reject()
      }
    })

  const onOversize = (file: any, detail: any) => {
    emit('oversize', file, detail)
  }
  const onClickPreview = (file: any, detail: any) => {
    emit('click-preview', file, detail)
  }
  const onClosePreview = () => {
    emit('close-preview')
  }
  const onDelete = (file: any, detail: any) => {
    emit('delete', file, detail)
  }

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
  const fileList = ref<any>(props.modelValue)

  const upload = { ...pick(props, [...keys, 'action', 'httpRequest', 'data']), fileList }
  const uploadProps = computed(() =>
    Object.assign({}, pick(props, keys), handleMobileUpload(upload, emit))
  )

  const fileRef = ref<any>(null)

  watch(
    () => fileList.value,
    () => {
      emit('update:modelValue', fileList.value)
    },
    { deep: true }
  )

  onMounted(() => {
    emit('getFile', fileRef)
  })

  return {
    uploadProps,
    fileList,
    fileRef
  }
}
