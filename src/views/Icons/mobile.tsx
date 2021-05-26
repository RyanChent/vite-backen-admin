import { defineComponent } from 'vue'
import MobileIcons from '@Mobile/Icons'
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