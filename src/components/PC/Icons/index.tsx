import { defineComponent, computed, ref, getCurrentInstance } from "vue";
import { copyContent } from '@/utils/dom.ts'
import icons from '@/data/icons.json'
import { t } from '@/lang/index.ts'
import './style.less'
const Icons = defineComponent({
    name: 'Icons',
    componentName: 'ManageIcons',
    setup() {
        const { proxy } = getCurrentInstance() as any
        const enKeytoChKey = computed(() => ({
            'el-icon': t('el-icon'),
            'vant-icon': t('vant-icon'),
            'vite-icon': t('vite-icon')
        }))
        const name = ref('el-icon')
        const clickIcon = async (key: string, icon: string) => {
            let copyIcon
            key !== 'vant-icon' ? copyIcon = `<i class="${key}-${icon}" />` : copyIcon = `<van-icon name="${icon}" />`
            await copyContent(copyIcon)
            proxy.$message.success(`复制成功：${copyIcon}`)
        }
        return {
            icons,
            name,
            enKeytoChKey,
            clickIcon
        }
    },
    render() {
        return <el-tabs v-model={this.name} type="border-card" stretch>
            {Object.entries(this.icons).map(([key, value]) =>
                <el-tab-pane key={key} name={key} label={(this.enKeytoChKey as any)[key]}>
                    <ul class='icon-list'>
                        {Boolean(Array.isArray(value) && value.length) &&
                            (value as Array<string>).map((item: string) =>
                                <li key={item} onClick={() => this.clickIcon(key, item)} title={`${key}-${item}`}>
                                    {key !== 'vant-icon' ? <i class={key + '-' + item} /> : <van-icon name={item} />}
                                    <span>{item}</span>
                                </li>
                            )
                        }
                    </ul>
                </el-tab-pane>)
            }
        </el-tabs>
    }
})

export default Icons