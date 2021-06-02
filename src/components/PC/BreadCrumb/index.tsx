import { defineComponent } from 'vue'
import { t } from "@/lang"
import './style'

const BreadCrumb = defineComponent({
    name: 'BreadCrumb',
    componentName: 'ManageBreadCrumb',
    props: {
        breadCrumb: {
            type: Array,
            default: () => []
        }
    },
    render() {
        return <el-breadcrumb separator-class="el-icon-arrow-right">
            {this.breadCrumb.map((route: any, key: number) =>
                <el-breadcrumb-item
                    replace
                    key={key}
                    to={route.redirect || route.path}
                >
                    {t(route.meta?.title)}
                </el-breadcrumb-item>)}
        </el-breadcrumb>
    }
})

export default BreadCrumb