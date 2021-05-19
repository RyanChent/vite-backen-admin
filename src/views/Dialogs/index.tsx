import { defineComponent, inject } from 'vue'
import './style.less'
import PCDialogs from './pc'
import MobileDialogs from './mobile'
const DialogPage = defineComponent({
    name: 'DialogPage',
    componentName: 'ManageDialogPage',
    components: {
        PCDialogs,
        MobileDialogs,
    },
    setup() {
        const isMobile = inject('isMobile') as any
        return () => !!isMobile.value ? <MobileDialogs /> : <PCDialogs />
    }
})

export default DialogPage