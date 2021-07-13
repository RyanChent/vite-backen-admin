import { defineComponent } from 'vue'
import { useWebSocket } from '@/hooks/socket'
import './style'

const Socket = defineComponent({
  name: 'Socket',
  componentName: 'ManageSocket',
  setup(props: any, { emit }: any) {
    return useWebSocket(props, emit)
  },
  render() {
    return (
      <section class="manage-socket-page">
        <el-card class="left-tool">
          {{
            header: () => (
              <>
                连接状态
                <el-tag type={this.socketStatus.status} size="small">
                  {this.socketStatus.statusText}
                </el-tag>
              </>
            ),
            default: () => (
              <>
                <el-input modelValue={(window as any)._config.ws} readonly disabled>
                  {{
                    prepend: () => '服务地址'
                  }}
                </el-input>
              </>
            )
          }}
        </el-card>
        <el-card header="消息记录" class="right-content"></el-card>
      </section>
    )
  }
})

export default Socket
