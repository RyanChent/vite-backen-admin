import { defineComponent, onMounted, ref } from 'vue'
import './style.less'
import { loadScript } from '@/utils/dom.ts'

const Footer = defineComponent({
    name: 'Footer',
    componentName: 'ManageFooter',
    setup() {
        const footerScript = ref(null)
        onMounted(() => {
            if (!footerScript.value) {
                footerScript.value = loadScript('/js/busuanzi.pure.mini.js')
            }
        })
        return () => <div class="global-footer">
            <p>CopyRight &copy; {new Date().getFullYear()} JarryChen. All Right Reserved</p>
            <p class="footer-visit-info">
                <span id="busuanzi_container_site_pv">访问量<span id="busuanzi_value_site_pv" />次</span>
                <span id="busuanzi_container_site_uv">访客数<span id="busuanzi_value_site_uv" />人</span>
            </p>
        </div>
    }
})

export default Footer