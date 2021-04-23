import { defineComponent, inject } from 'vue'
import './style.less'
import PCIcons from './pc'
import MobileIcons from './mobile'

const IconsPage = defineComponent({
    name: 'IconPage',
    componentName: 'ManageIconPage',
    components: {
        PCIcons,
        MobileIcons
    },
    setup() {
        return () => {
            const isMobile = inject('isMobile') as any
            return !!isMobile.value ? <MobileIcons /> : <PCIcons />
        }
    }
})

export default IconsPage