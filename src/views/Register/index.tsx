import { defineComponent } from "vue";
import PCRegister from './pc'
import MobileRegister from './mobile'
import './style'

const Register = defineComponent({
    name: 'Register',
    componentName: 'ManageRegister',
    components: {
        PCRegister,
        MobileRegister
    },
    setup() {
        return {

        }
    },
    render() {
        return <div class="manage-register-info">
            <el-page-header icon="el-icon-arrow-left" onBack={this.$router.back} />
        </div>
    }
})

export default Register