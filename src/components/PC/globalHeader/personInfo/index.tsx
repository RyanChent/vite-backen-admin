import { defineComponent, resolveComponent } from 'vue'
import { usePersonProps } from '@/hooks/userInfo'
import InfoPreview from './preview'
import InfoEdit from './edit'
import './style'

const PersonDialog = defineComponent({
  name: 'PersonInfo',
  componentName: 'ManagePersonDialog',
  __file: '@PC/globalHeader/personInfo',
  components: {
    InfoPreview,
    InfoEdit
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }: any) {
    return usePersonProps(props, emit)
  },
  render() {
    const Dialogs: any = resolveComponent('Dialogs')
    return (
      <Dialogs
        v-model={this.visible}
        title="个人信息"
        customClass="manage-person-info"
        modalClass={this.modalClass}
        append-to-body
      >
        <InfoPreview user={this.user} />
      </Dialogs>
    )
  }
})

export default PersonDialog
