import { defineComponent } from 'vue'
import { useWebSocket } from '@/hooks/socket'
import './style'

const Socket = defineComponent({
  name: 'Socket',
  componentName: 'ManageSocket',
  emits: ['get-socket'],
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
                    prepend: () => '服务地址',
                    suffix: () => (
                      <el-button
                        type="primary"
                        plain
                        onClick={(e: MouseEvent) => {
                          e.stopPropagation()
                          this.initSocket()
                        }}
                      >
                        开启连接
                      </el-button>
                    )
                  }}
                </el-input>
                <div class="socket-message-send">
                  <el-input
                    type="textarea"
                    placeholder="请输入要发送的内容"
                    v-model={this.messageSend}
                    autosize={{
                      minRows: 4,
                      maxRows: 8
                    }}
                    onKeyup={({ code }: KeyboardEvent) => {
                      if (code === 'Enter') {
                        this.sendMessage(this.messageSend)
                      }
                    }}
                    disabled={this.socketStatus.status !== 'success'}
                  />
                  <el-button
                    type="primary"
                    round
                    plain
                    size="small"
                    disabled={this.socketStatus.status !== 'success'}
                    onClick={this.sendMessage}
                  >
                    发送
                  </el-button>
                </div>
              </>
            )
          }}
        </el-card>
        <el-card
          header="消息记录"
          class="right-content"
          onContextmenu={(e: MouseEvent) => {
            e.stopPropagation()
            e.preventDefault()
          }}
        >
          {Object.keys(this.messageList).length === 0 ? (
            <el-empty description="暂无数据" />
          ) : (
            Object.entries(this.messageList).map(([key, value]: any) => (
              <>
                <el-divider>{key}</el-divider>
                <ul class="chats-history">
                  {value.map((chat: any) => (
                    <li
                      key={chat.uid + chat.createDate}
                      class={{ my: chat.uid === this.currentUser.uid }}
                    >
                      <p style="color: #67c23a">
                        {chat.username}&emsp;{chat.createDate}
                      </p>
                      <p style={chat.style}>{chat.content}</p>
                    </li>
                  ))}
                </ul>
              </>
            ))
          )}
        </el-card>
      </section>
    )
  }
})

export default Socket
