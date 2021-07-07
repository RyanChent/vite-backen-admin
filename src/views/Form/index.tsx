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
    const model = ref<any>({
      test4: [],
      test6: [],
      test2: []
    })
    const isMobile = inject<any>('isMobile')
    return () =>
      isMobile.value ? <MobileForm v-model={model.value} /> : <PCForm v-model={model.value} />
  }
})

export default FormPage
