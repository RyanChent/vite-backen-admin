import { defineComponent, inject } from 'vue'
import pcLogin from './pc'
import './style.less'

const LoginPage = defineComponent({
    name: 'Login',
    componentName: 'ManageLogin',
    components: {
        pcLogin
    },
    setup() {
        const isMobile = inject('isMobile') as any
        return () => !!isMobile.value ? null : <pc-login />
    }
})

export default LoginPage