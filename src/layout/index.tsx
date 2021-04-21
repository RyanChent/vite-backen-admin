import { defineComponent, h } from "vue";
import pcLayout from "./PC";
import mobileLayout from "./Mobile";

const layout = defineComponent({
    name: 'Layout',
    componentName: 'ManageLayout',
    props: {
        isMobile: Boolean
    },
    components: {
        pcLayout,
        mobileLayout
    },
    setup(props) {
        return () => !props.isMobile ? <pc-layout /> : <mobile-layout />
    }
})

export default layout