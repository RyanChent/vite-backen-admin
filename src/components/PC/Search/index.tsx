import { computed, defineComponent, inject, ref } from 'vue'
import { useStore } from 'vuex'
import { isNotEmptyString, isFunction } from '@/utils/types'
import { t } from '@/lang'
import './style'

const flatRoute = (routes: Array<any>, isMobile: boolean): any =>
  routes
    .map((route) => {
      if (!route.hidden && route.meta?.title) {
        const obj = {
          title: route.meta.title,
          path: route.redirect || route.path
        }
        if (Array.isArray(route.children) && route.children.length) {
          return flatRoute(route.children, isMobile)
        }
        return obj
      }
    })
    .filter(Boolean)
    .flat(1)

const Search = defineComponent({
  name: 'HeadSearch',
  componentName: 'ManageHeadSearch',
  __file: '@PC/Search',
  setup() {
    const store = useStore()
    const isMobile = inject<any>('isMobile')
    const searchValue = computed<any>({
      get() {
        return store.state.search.searchValue
      },
      set(value) {
        store.dispatch('setSearchValue', value)
      }
    })
    const routes = computed<Array<any>>(() => store.state.permission.routes)
    const titles = flatRoute(routes.value, isMobile.value)
    const fetchSuggestions = (queryString: string, cb: Function) => {
      if (isNotEmptyString(queryString)) {
        cb(
          titles.filter(
            (item: any) =>
              t(item.title).includes(queryString) || queryString.includes(t(item.title))
          )
        )
      } else {
        cb(titles)
      }
    }
    return {
      routes,
      searchValue,
      fetchSuggestions,
      showSearch: ref<any>(false),
      isMobile: inject<any>('isMobile')
    }
  },
  render() {
    const slots: any = this.$slots
    return (
      <>
        <van-icon
          name="search"
          onClick={(e: MouseEvent) => {
            e.stopPropagation()
            this.showSearch = !this.showSearch
            if (!this.showSearch) {
              this.searchValue = ''
            }
          }}
          title="搜索"
          style={{
            margin: '0 3px',
            'vertical-align': 'center',
            cursor: 'pointer'
          }}
        />
        <el-autocomplete
          v-model={this.searchValue}
          placeholder="请输入"
          size="small"
          value-key="title"
          clearable
          class={{
            show: this.showSearch,
            'manage-head-search': true,
            pc: !this.isMobile && this.showSearch
          }}
          debounce={500}
          ref={(el: any) => {
            this.showSearch && el?.focus && el.focus()
          }}
          fetch-suggestions={this.fetchSuggestions}
          onSelect={(select: { title: string; path: string }): void => {
            if (select.path.startsWith('http') || select.path.startsWith('//'))
              location.href = select.path
            else this.$router.push(select.path)
          }}
        >
          {{
            suffix: () => <i class="el-icon-edit el-input__icon" />,
            default: ({ item }: any) =>
              isFunction(slots.dropdown) ? (
                slots.dropdown(item)
              ) : (
                <>
                  <span
                    title={t(item.title)}
                    class={{
                      primary: ['http', '//'].some((key) => item.path.startsWith(key))
                    }}
                  >
                    {t(item.title)}
                  </span>
                  {['http', '//'].some((key) => item.path.startsWith(key)) && (
                    <i class="el-icon-link primary" />
                  )}
                </>
              )
          }}
        </el-autocomplete>
      </>
    )
  }
})

export default Search
