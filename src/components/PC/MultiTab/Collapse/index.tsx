import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

const Collapse = defineComponent({
    name: 'Collapse',
    componentName: 'ManagePCCollapse',
    setup() {
        const store = useStore()
        const collapse = computed(({
            get() {
                return store.state.menus.collapse
            },
            set(value) {
                store.dispatch('changeCollapse', value)
            }
        }))
        return {
            collapse
        }
    },
    render() {
        return <el-button
            type="text"
            icon={this.collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'}
            title={this.collapse ? '展开' : '折叠'}
            onClick={() => this.collapse = !this.collapse}
            style="margin-right: 10px;font-size: 1rem;"
        />
    }
})

export default Collapse