import { defineComponent } from 'vue'
import { useWebSocket } from '@/hooks/socket'
import Tree from '../Tree'
import './style'

const Socket = defineComponent({
  name: 'Socket',
  componentName: 'ManageSocket',
  components: {
    Tree
  },
  emits: ['get-socket'],
  __file: '@PC/Socket',
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
                          this.socketStatus.status !== 'success'
                            ? this.initSocket()
                            : this.socket.close()
                        }}
                      >
                        {this.socketStatus.status !== 'success' ? '开启' : '关闭'}连接
                      </el-button>
                    )
                  }}
                </el-input>
                <div class="socket-tips">
                  <header>提示</header>
                  <section>
                    &emsp;&emsp;此功能仅为socket测试，仅可在本地环境中开发和测试，暂不提供对外服务。
                    <br />
                    &emsp;&emsp;使用时，需要先开启链接，开启成功便同步拉取用户数据和消息记录。
                  </section>
                </div>
                <Tree data={this.userList} showSearch empty-text="请先开启服务">
                  {{
                    default: ({ data }: any) => (
                      <div class="user-node">
                        <el-avatar size="small" src={data.avatar} alt={data.email} />
                        <span>{data.label}</span>
                      </div>
                    )
                  }}
                </Tree>
                <div class="socket-message-send">
                  <el-input
                    type="textarea"
                    placeholder="请输入要发送的内容"
                    v-model={this.messageSend}
                    autosize={{
                      minRows: 5,
                      maxRows: 10
                    }}
                    clearable
                    show-word-limit
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
                      <p style="color: #67c23a; font-size: .8rem;">
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
