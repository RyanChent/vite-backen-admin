import { defineComponent, ref, nextTick } from 'vue'
import AboutPage from './About'
import { t } from '@/lang'
import './style'

const useDocsPageProps = (props: any) => {
    const current = ref<any>({
        path: '/about',
        title: 'about-page',
        catalog: null
    })
    const mdRef = ref<any>(null)
    const cid = ref<string>('')
    const clickMdPage = async (doc: any) => {
        current.value = Object.assign({}, doc, {
            catalog: null
        })
        await nextTick()
        const scrollDom: any = document.querySelector('.docs-content')
        const h3set = mdRef.value.$el.querySelectorAll('h3')
        const aset = mdRef.value.$el.querySelectorAll('.markdownIt-Anchor')
        aset.forEach((dom: HTMLElement) => dom.parentNode?.removeChild(dom))
        current.value.catalog = [...h3set].map((h3: HTMLElement) => {
            const text = h3.innerText.replace(/#/g, '')
            return <li
                class={{
                    select: cid.value === h3.id
                }}
                onClick={(e: MouseEvent) => {
                    e.stopPropagation()
                    e.preventDefault()
                    cid.value = h3.id
                    if (scrollDom.scrollTo) {
                        scrollDom.scrollTo({ behavior: 'smooth', top: h3.offsetTop - 100 - h3.offsetHeight })
                    }
                }}>
                {text}
            </li>
        })
    }
    return {
        current,
        mdRef,
        clickMdPage,
        cid
    }
}

const iframePage = (tag: string) => {
    const src = {
        '/element': 'https://element-plus.org/#/zh-CN/component/installation',
        '/vant': 'https://vant-contrib.gitee.io/vant/v3/#/zh-CN/picker'
    }[tag]

    return <iframe
        src={src}
        allowfullscreen
        allowtransparency
        width="100%"
        height="100%"
        frameborder="no"
        style="outline: none; object-fit: contain"
    />
}

const Docs = defineComponent({
    name: 'Docs',
    componentName: 'ManageDocs',
    components: {
        AboutPage
    },
    props: {
        menus: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        const { current, mdRef, clickMdPage, cid } = useDocsPageProps(props)
        return {
            current,
            mdRef,
            clickMdPage,
            cid
        }
    },
    render() {
        const { component }: any = this.current
        return <section class="manage-docs-page">
            <ul class="sidebar-menu">
                <li
                    class={{
                        'about-menu': true,
                        selected: this.current.path === '/about'
                    }}
                    onClick={() => this.current = {
                        path: '/about',
                        title: 'about-page',
                        catalog: null
                    }}
                >
                    关于
               </li>
                {
                    this.menus.map((doc: any) =>
                        <li
                            class={{
                                selected: this.current.path === doc.path
                            }}
                            key={doc.path}
                            title={t(doc.title)}
                            onClick={() => this.clickMdPage(doc)}
                        >
                            {t(doc.title)}
                        </li>
                    )
                }
                <li
                    class={{
                        'other-menu': true,
                        selected: this.current.path === '/element'
                    }}
                    onClick={() => this.current = {
                        path: '/element',
                        title: 'element-page',
                        catalog: null
                    }}
                >
                    Element Plus
                </li>
                <li
                    class={{
                        selected: this.current.path === '/vant'
                    }}
                    onClick={() => this.current = {
                        path: '/vant',
                        title: 'vant-page'
                    }}
                >
                    Vant Next
                </li>
            </ul>
            <main class="docs-content">
                {
                    ['/vant', '/element', '/about'].includes(this.current.path)
                        ? <>
                            {
                                this.current.path === '/about'
                                    ? <about-page />
                                    : iframePage(this.current.path)
                            }
                        </>
                        : (component && <component ref={(el: any) => el && (this.mdRef = el)} />)
                }
            </main>
            {
                Array.isArray(this.current.catalog) && <ul class="docs-catalog">
                    {this.current.catalog}
                </ul>
            }
        </section>
    }
})

export default Docs