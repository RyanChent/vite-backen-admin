import { computed, defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { isNotEmptyString } from '@/utils/types.ts'
import _ from 'lodash'
import { t } from '@/lang/index.ts'
import './style.less'

const flatRoute = (routes: Array<any>): any => routes.map(route => {
    if (!route.hidden && route.meta?.title) {
        const obj = {
            title: route.meta.title,
            path: route.redirect || route.path
        }
        if (Array.isArray(route.children) && route.children.length) {
            return flatRoute(route.children)
        }
        return obj
    }
}).filter(Boolean).flat(1)

const Search = defineComponent({
    name: 'HeadSearch',
    componentName: 'ManageHeadSearch',
    setup() {
        const store = useStore()
        const searchValue = computed<any>({
            get() {
                return store.state.search.searchValue
            },
            set(value) {
                store.dispatch('setSearchValue', t(value) || value)
            }
        })
        const routes = computed<Array<any>>(() => store.state.permission.routes)
        const titles = flatRoute(routes.value)
        const fetchSuggestions = _.debounce((queryString: string, cb: Function) => {
            if (isNotEmptyString(queryString)) {
                cb(titles.filter((item: any) => t(item.title).includes(queryString) || queryString.includes(t(item.title))))
            } else {
                cb(titles)
            }
        }, 500)
        return {
            routes,
            searchValue,
            fetchSuggestions,
            showSearch: ref<any>(false)
        }
    },
    render() {
        return <>
            <van-icon
                name="search"
                onClick={(e: MouseEvent) => {
                    e.stopPropagation()
                    this.showSearch = !this.showSearch
                }}
            />
            <el-autocomplete
                v-model={this.searchValue}
                placeholder="请输入"
                size="small"
                value-key="title"
                class={{
                    'show': this.showSearch,
                    'manage-head-search': true
                }}
                debounce={500}
                fetch-suggestions={this.fetchSuggestions}
                onSelect={(select: { title: string, path: string }): void => {
                    this.$router.push(select.path)
                }}
            >
                {{ default: ({ item }: any) => <span title={t(item.title)}>{t(item.title)}</span> }}
            </el-autocomplete>
        </>
    }
})

export default Search