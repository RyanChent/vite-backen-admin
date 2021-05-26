import { defineComponent } from 'vue'
import Icons from '@PC/Icons'
const PCIcons = defineComponent({
    name: 'PCIcons',
    componentName: 'ManagePcIcons',
    components: {
        Icons
    },
    setup() {
        return () => <Icons />
    }
})

export default PCIcons