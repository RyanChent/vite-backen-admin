import { defineComponent, ref } from 'vue'

const useColorProps = (props: any) => {
    const color = ref<any>('#409eff')
    return {
        color
    }
}

const colorPicker = defineComponent({
    name: 'ColorPicker',
    componentName: 'ManageColorPicker',
    setup(props) {
        const { color } = useColorProps(props)
        return {
            color
        }
    },
    render() {
        return <el-color-picker
            v-model={this.color}
            show-alpha
            size="small"
        />
    }
})

export default colorPicker