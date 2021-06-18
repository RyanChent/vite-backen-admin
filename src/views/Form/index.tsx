import { defineComponent, inject, ref } from 'vue'
import PCForm from './pc'
import MobileForm from './mobile'
import './style'

const FormPage = defineComponent({
  name: 'FormPage',
  componentName: 'ManageFormPage',
  components: {
    PCForm,
    MobileForm
  },
  setup() {
    const model = ref<any>({})
    const isMobile = inject<any>('isMobile')
    return () => (!!isMobile.value ? <MobileForm /> : <PCForm />)
  }
})

export default FormPage
