import { isFunction, isNotEmptyString } from '@/utils/types.ts'
const clickout = (e: MouseEvent, callback: unknown, selector: string) => {
    e.stopPropagation()
    e.preventDefault()
    const insideDom = (e as any).path.find((item: HTMLElement) => item.querySelector && item.querySelector(selector))
    if (insideDom && isFunction(callback)) {
        (callback as Function)()
    }
}
const clickOutSide = {
    name: 'click-outside',
    mounted(el: HTMLElement, { value: { callback } }: any) {
        const { className, id } = el
        const selector = isNotEmptyString(id) ? `#${id}` : `.${className}`
        document.addEventListener('click', (e: MouseEvent) => clickout(e, callback, selector))
    },
    beforeUnmount(el: HTMLElement, { value: { callback } }: any) {
        const { className, id } = el
        const selector = isNotEmptyString(id) ? `#${id}` : `.${className}`
        document.removeEventListener('click', (e: MouseEvent) => clickout(e, callback, selector))
    },
}

export default clickOutSide