import { defineComponent, inject } from 'vue'
import './style.less'
import PCDialogs from './pc'
import MobileDialogs from './mobile'
const DialogPage = defineComponent({
    name: 'dialogPage',
    componentName: 'ManageDialogPage',
    components: {
        PCDialogs,
        MobileDialogs,
    },
    setup(props) {
        const isMobile = (inject('isMobile') as Function)()
        return () => isMobile.value ? <MobileDialogs /> : <PCDialogs />
    }
})

export default DialogPage