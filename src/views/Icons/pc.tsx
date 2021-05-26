import { defineComponent } from 'vue'
import Icons from '@PC/Icons/index.tsx'
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