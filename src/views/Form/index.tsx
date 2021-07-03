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
      test1: '',
      test2: [],
      test3: '',
      test4: [],
      test5: '',
      test6: [],
      test7: new Date(),
      test8: [],
      test9: []
    })
    const isMobile = inject<any>('isMobile')
    return () =>
      isMobile.value ? <MobileForm v-model={model.value} /> : <PCForm v-model={model.value} />
  }
})

export default FormPage
