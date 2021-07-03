import { defineComponent, resolveComponent } from 'vue'

const XlsxDialog = defineComponent({
  name: 'XlsxDialog',
  componentName: 'ManageXlsxDialog',
  render() {
    const Dialogs: any = resolveComponent('Dialogs')
    const Upload: any = resolveComponent('Upload')
    const parent: any = this.$parent
    return (
      <Dialogs
        v-model={parent.xlsxDialogVisible}
        {...{
          title: '文件数据导入',
          dragging: true,
          destroyOnClose: true,
          customClass: 'manage-xlsx-upload',
          closeOnClickModal: false,
          closeOnPressEscape: false,
          width: '40%'
        }}
      >
        <Upload
          {...{
            drag: true,
            showFileList: false,
            action: '',
            accept: '.xlsx,.xls,.csv',
            beforeUpload: async (file: any) => {
              parent.tableLoading = true
              await parent.loadDataByXlsx(file)
              parent.xlsxDialogVisible = false
              parent.tableLoading = false
            }
          }}
        />
      </Dialogs>
    )
  }
})

export default XlsxDialog
