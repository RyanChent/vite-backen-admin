import Sortable from 'sortablejs'
import { isNotEmptyString, isFunction } from '@/utils/types'

const registerDom = (el: HTMLElement, dragList: Array<any>) => {
    if (Array.isArray(dragList) && dragList.length) {
        el.style.userSelect = 'none'
        if (!draggable.dragListInit.length) {
            document.body.addEventListener('drop', (e: MouseEvent) => {
                e.preventDefault()
                e.stopPropagation()
            })
            draggable.dragListInit = dragList.map(dragItem => Sortable.create(el.querySelector(dragItem.dom),
                Object.assign({}, isNotEmptyString(dragItem.target) && {
                    draggable: dragItem.target
                }, isFunction(dragItem.callback) && {
                    onEnd: dragItem.callback
                })
            )
            )
        }
        draggable.dragListInit.forEach((sortable: any) => sortable.options.disabled = false)
    } else {
        el.style.userSelect = 'auto'
        draggable.dragListInit.forEach((sortable: any) => sortable.options.disabled = true);
    }
}

const draggable = {
    name: 'draggable',
    dragListInit: [] as any,
    mounted(el: HTMLElement, { value: dragList }: any) {
        registerDom(el, dragList)
    },
    updated(el: HTMLElement, { value: dragList }: any) {
        registerDom(el, dragList)
    },
    beforeUnmount() {
        document.body.removeEventListener('drop', (e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
        })
        draggable.dragListInit.forEach((sortable: any) => sortable.destroy && sortable.destroy());
        draggable.dragListInit = []
    }
}

export default draggable