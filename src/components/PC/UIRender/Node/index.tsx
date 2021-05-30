import { defineComponent } from 'vue'
import Tree from '@PC/Tree'
const Node = defineComponent({
    name: 'ComponentNode',
    componentName: 'ManageComponentNode',
    components: {
        Tree
    },
    props: {
        renderStr: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        return {

        }
    },
    render() {
        return <Tree
            data={this.renderStr}
            showSearch
            node-key='id'
            empty-text="暂无节点"
            props={{
                label: 'key',
                children: 'slots'
            }}
        />
    }
})

export default Node