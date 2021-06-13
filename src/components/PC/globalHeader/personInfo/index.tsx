import { defineComponent, resolveComponent, TransitionGroup } from 'vue'
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
        width={750}
        modalClass={this.modalClass}
        close-on-click-modal={false}
        close-on-press-escape={false}
        append-to-body
        dragging
      >
        <TransitionGroup enterActiveClass="animated fadeIn">
          <InfoPreview
            user={this.user}
            lang={this.lang}
            role={this.role}
            key="preview"
            v-show={this.panel === 'preview'}
          />
          {this.panel === 'edit' && (
            <InfoEdit v-model={[this.user, 'user']} lang={this.lang} role={this.role} key="edit" />
          )}
        </TransitionGroup>
      </Dialogs>
    )
  }
})

export default PersonDialog
