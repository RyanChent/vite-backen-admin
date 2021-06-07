import { defineComponent } from 'vue'
import { loadScript } from '@/utils/dom'
import './style'

const Footer = defineComponent({
  name: 'Footer',
  componentName: 'ManageFooter',
  __file: '@PC/globalFooter',
  setup() {
    return () => (
      <div class="global-footer">
        <p>CopyRight &copy; {new Date().getFullYear()} JarryChen. All Right Reserved</p>
        <p class="beian-info">
          <img style="width: 20px; height: 20px" src="https://jarrychen.cn/beian.png" alt="备案" />
          <a
            href="http://www.beian.miit.gov.cn"
            target="_blank"
            rel="external nofollow"
          >&nbsp;粤ICP备18009401号
          </a>
        </p>
      </div>
    )
  }
})

export default Footer
