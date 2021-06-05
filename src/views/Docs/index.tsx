import { defineComponent, onBeforeUnmount, onMounted, markRaw } from 'vue'
import { useStore } from 'vuex'
import Docs from '@PC/Docs'

const menus = Object.entries(import.meta.globEager('./*.md')).map(([key, value]: any) => {
    const name = key.replace(/(.*\/)*([^.]+)/i, "$2").replace('.md', '')
    return {
        path: `/${name}`,
        title: `${name}-docs`,
        component: markRaw(defineComponent(value.default))
    }
})

const useDocsPageProps = () => {
    const store = useStore()
    let navMode: undefined | string
    let collapse: undefined | boolean
    onMounted(() => {
        navMode = store.state.config.navMode
        collapse = store.state.config.collapse
        store.dispatch('changeNavMode', 'horizontal')
        store.dispatch('changeCollapse', false)
    })
    onBeforeUnmount(() => {
        store.dispatch('changeNavMode', navMode)
        store.dispatch('changeCollapse', collapse)
    })
}

const DocsPage = defineComponent({
    name: 'DocsPage',
    componentName: 'ManageDocsPage',
    components: {
        Docs: defineComponent(Docs)
    },
    setup() {
        useDocsPageProps()
    },
    render() {
        return <Docs menus={menus} />
    }
})

export default DocsPage