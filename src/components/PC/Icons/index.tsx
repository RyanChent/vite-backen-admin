import { defineComponent } from 'vue'
import { useIconProps } from '@/hooks/icons'
import './style'
const Icons = defineComponent({
  name: 'Icons',
  componentName: 'ManageIcons',
  __file: '@PC/Icons',
  setup() {
    const { enKeytoChKey, name, clickIcon, icons } = useIconProps()
    return {
      icons,
      name,
      enKeytoChKey,
      clickIcon
    }
  },
  render() {
    return (
      <el-tabs v-model={this.name} type="border-card" stretch>
        {Object.entries(this.icons).map(([key, value]: any) => (
          <el-tab-pane key={key} name={key} label={this.enKeytoChKey[key]}>
            <ul class="icon-list">
              {Array.isArray(value) &&
                value.length > 0 &&
                value.map((item: string) => (
                  <li
                    key={item}
                    onClick={() => this.clickIcon(key, item, (this as any).$message.success)}
                    title={`${key}-${item}`}
                  >
                    {key !== 'vant-icon' ? (
                      <i class={key + '-' + item} />
                    ) : (
                      <van-icon name={item} />
                    )}
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
          </el-tab-pane>
        ))}
      </el-tabs>
    )
  }
})

export default Icons
