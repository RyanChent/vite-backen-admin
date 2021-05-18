import { defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, ref, resolveComponent } from 'vue'
import { t } from '@/lang/index.ts'
import { domScroll as DomScroll } from '@/utils/dom.ts'
import { toCamel } from '@/utils/tool.ts'
import './style.less'

const useComponents = () => {
    const { appContext: { components } }: any = getCurrentInstance()
    const keys = [...new Set(Object.keys(components).map(toCamel))]
    const pageSize = 20
    let current = 0
    const componentKeys = ref<any>(keys.slice(0, pageSize))
    const listLoad = () => {
        current += 1
        const start = pageSize * current
        const end = Math.min(pageSize * (current + 1), keys.length)
        componentKeys.value = componentKeys.value.concat(keys.slice(start, end))
    }
    return {
        componentKeys,
        listLoad,
        components
    }
}

const ComponentTools = defineComponent({
    name: 'ComponentTools',
    componentName: 'ManageComponentTools',
    setup() {
        let domScroll: any;
        const { components, listLoad, componentKeys } = useComponents()
        onMounted(() => {
            domScroll = new DomScroll(document.getElementById('last-component'), ([target]: any) => {
                if (target.isIntersecting) {
                    // listLoad()
                    console.log('到底了')
                }
            })
        })
        onBeforeUnmount(() => {
            domScroll.disconnect()
            domScroll = null
        })
        return {
            components,
            listLoad,
            componentKeys
        }
    },
    render() {
        return <ul class="infinite-component-list"
            onContextmenu={(e) => {
                e.stopPropagation()
                e.preventDefault()
            }}>
            {this.componentKeys.map((key: string) => {
                const Component: any = resolveComponent(key)
                return <li title={t(key)}>
                    <span class="component-key">{t(key)}</span>
                    <div class="component-img">
                        <Component >
                            {{ default: () => <span /> }}
                        </Component>
                    </div>
                </li>
            })}
            <li id="last-component" style="height: 0;border: none" />
        </ul>
    }
})

export default ComponentTools