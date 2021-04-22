import { defineComponent } from 'vue'

const MobileHome = defineComponent({
    name: 'mobileHome',
    componentName: 'ManageMobileHome',
    setup() {
        return () => <section class="dialogs-page-mobile">
            <div>我是手机端页面</div>
        </section>
    }
})

export default MobileHome