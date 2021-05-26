import { ref, computed } from 'vue'
import { pick } from '@/utils/props'

export const useTreeProps = (props: any, emit: any, component: any) => {
    const treeProps = computed(() =>
        Object.assign(
            {},
            pick(props, Object.keys(component.props)),
            {
                emptyText: '暂无数据',
            }
        ))
    return {
        treeProps
    }
}