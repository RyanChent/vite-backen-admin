import { computed, defineComponent } from 'vue'
import { isNotEmptyString } from '@/utils/types'
import './style'

const SvgIcon = defineComponent({
    name: 'SvgIcon',
    componentName: 'ManageSvgIcon',
    __file: '@PC/SvgIcon',
    props: {
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        return {
            iconName: computed(() => `#icon-${props.name}`),
            svgClass: computed(() => isNotEmptyString(props.name) ? `svg-icon icon-${props.name}` : 'svg-icon')
        }
    },
    render() {
        return <svg class={this.svgClass} {...this.$attrs} style={{ color: this.color }} >
            <use xlinkHref={this.iconName} />
        </svg>
    }
})

export default SvgIcon