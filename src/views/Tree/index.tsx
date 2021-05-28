import { defineComponent, ref } from 'vue'
import Tree from '@PC/Tree'
import './style'

const TreePage = defineComponent({
    name: 'TreePage',
    componentName: 'ManageTreePage',
    components: {
        Tree
    },
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
        return <div class="manage-pc-tree-demo">
            <section class="demo-panel">
                <header>带搜索树</header>
                <Tree data={this.treeData} node-key="id" show-checkbox show-search />
            </section>
            <section class="demo-panel">
                <header>单选树</header>
                <Tree data={this.treeData} node-key="id" show-checkbox single show-search />
            </section>
            <section class="demo-panel">
                <header>节点可编辑树</header>
                <Tree data={this.treeData} node-key="id" show-checkbox editable show-search />
            </section>
            <section class="demo-panel">
                <header>搜索，编辑，拖拽</header>
                <Tree data={this.treeData} node-key="id" show-checkbox editable show-search draggable />
            </section>
        </div>
    }
})

export default TreePage