import { defineComponent, resolveComponent, ref } from 'vue'
import './style'

const TreePage = defineComponent({
    name: 'TreePage',
    componentName: 'ManageTreePage',
    setup() {
        const treeData = ref<any>([
            {
                id: 1,
                label: '节点1',
                children: [
                    {
                        id: 2,
                        label: '节点2'
                    },
                    {
                        id: 3,
                        label: '节点3'
                    }
                ]
            },
            {
                id: 4,
                label: '节点4'
            }
        ])
        return {
            treeData
        }
    },
    render() {
        const Tree: any = resolveComponent('Tree')
        return <Tree data={this.treeData} node-key="id" show-checkbox single />
    }
})

export default TreePage