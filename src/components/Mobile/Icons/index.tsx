import { defineComponent } from 'vue'
import { useIconProps } from '@/hooks/icons'
import { Tab, Tabs, Grid, GridItem } from 'vant'
import './style'

const MobileIcons = defineComponent({
  name: 'MobileIcons',
  componentName: 'ManageMobileIcons',
  components: {
    Tabs,
    Tab,
    Grid,
    GridItem
  },
  __file: '@Mobile/Icons',
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
      <Tabs v-model={[this.name, 'active']} sticky animated square>
        {Object.entries(this.icons).map(([key, value]: any) => (
          <Tab key={key} name={key} title={this.enKeytoChKey[key]}>
            <Grid>
              {Array.isArray(value) &&
                value.length > 0 &&
                value.map((item: string) => (
                  <GridItem
                    onClick={() => this.clickIcon(key, item, (this as any).$toast)}
                    title={`${key}-${item}`}
                  >
                    {key !== 'vant-icon' ? (
                      <i class={key + '-' + item} />
                    ) : (
                      <van-icon name={item} />
                    )}
                    <span>{item}</span>
                  </GridItem>
                ))}
            </Grid>
          </Tab>
        ))}
      </Tabs>
    )
  }
})

export default MobileIcons
