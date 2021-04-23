import { defineComponent, resolveComponent } from 'vue'

const PCIcons = defineComponent({
    name: 'PCIcons',
    componentName: 'ManagePcIcons',
    setup() {
        const Icons = resolveComponent('Icons') as any
        return () => <Icons />
    }
})

export default PCIcons