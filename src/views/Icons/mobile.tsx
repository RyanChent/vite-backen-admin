import { defineComponent } from 'vue'
import MobileIcons from '@Mobile/Icons/index.tsx'
const mobileIcons = defineComponent({
    name: 'mobileIconsIcons',
    componentName: 'ManageMobileIconsIcons',
    components: {
        MobileIcons
    },
    setup() {
        return () => <MobileIcons />
    }
})

export default mobileIcons