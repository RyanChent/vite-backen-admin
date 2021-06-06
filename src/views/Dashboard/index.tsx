import { defineComponent } from 'vue'
import { authorize, token } from '@/api/baidu/tongji'
import './style'

const DashBoard = defineComponent({
    name: 'DashBoard',
    componentName: 'ManagePCDashBoard',
    setup() {
        authorize().then(token)
        return {
        }
    },
    render() {
        return <div>测试中</div>
    }
})

export default DashBoard