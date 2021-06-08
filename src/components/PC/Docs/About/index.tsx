import { defineComponent } from 'vue'
import packageShow from '@/data/packageShow'
import { t } from '@/lang'
import './style'

const trShow = (value: any) => {
    const res = []
    const list = Object.entries(value)
    for (let i = 0; i < list.length; i += 3) {
        if (list[i]) {
            res.push(<tr>
                <td>{list[i][0]}</td>
                <td>{list[i][1]}</td>
                {list[i + 1] && <>
                    <td>{list[i + 1][0]}</td>
                    <td>{list[i + 1][1]}</td>
                </>
                }
                {list[i + 2] && <>
                    <td>{list[i + 2][0]}</td>
                    <td>{list[i + 2][1]}</td>
                </>
                }
            </tr>)
        }
    }
    return res
}

const About = defineComponent({
    name: 'AboutDocs',
    componentName: 'ManageAboutDocs',
    render() {
        return <section
            class="about-docs-page"
            onContextmenu={(e) => {
                e.stopPropagation()
                e.preventDefault()
            }}
        >
            <div class="ribbon">
                <a href="https://github.com/RyanChent/vite-backen-admin" target="_blank" rel="external nofollow">
                    fork me on github
                </a>
            </div>
            <el-card header="项目信息">
                <table class="not-el-table">
                    <tbody>
                        <tr>
                            <td>版本</td>
                            <td>
                                <el-tag type="primary">1.0.0</el-tag>
                            </td>
                            <td>项目地址</td>
                            <td>
                                <el-link type="primary" underline={false} href="https://github.com/RyanChent/vite-backen-admin">vite-backen-admin</el-link>
                            </td>
                        </tr>
                        <tr>
                            <td>预览地址</td>
                            <td>
                                <el-link type="primary" underline={false} href="https://jarrychen.xyz">vite-backen-admin</el-link>
                            </td>
                            <td>文档地址</td>
                            <td>
                                <el-link type="primary" underline={false} href="https://jarrychen.xyz/docs">vite-backen-admin</el-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </el-card>
            {
                Object.entries(packageShow).map(([key, value]: any) =>
                    <el-card header={t(key)} key={key}>
                        <table class="not-el-table">
                            <tbody>
                                {trShow(value)}
                            </tbody>
                        </table>
                    </el-card>
                )
            }
        </section>
    }
})

export default About