import { defineComponent, inject } from 'vue'
import PCIcons from '@PC/Icons'
import MobileIcons from '@Mobile/Icons'
import './style'

const IconsPage = defineComponent({
  name: 'IconPage',
  componentName: 'ManageIconPage',
  components: {
    PCIcons: defineComponent(PCIcons),
    MobileIcons: defineComponent(MobileIcons)
  },
  setup() {
    const isMobile = inject<any>('isMobile')
    return () => {
      return !!isMobile.value ? <MobileIcons /> : <PCIcons />
    }
  }
})

export default IconsPage
