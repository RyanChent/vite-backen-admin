import { computed, defineComponent, PropType, ref } from 'vue'
import { isFunction, isNotEmptyString } from '@/utils/types'
import './style'

interface Message {
  notify: any[]
  message: any[]
  wait: any[]
}

interface MessageProps {
  id?: string
  icon?: string
  name?: string
  content?: string
  date?: string
  status?: string
  statusText?: string
  tip?: string
}

const messageMap: any = {
  notify: '通知',
  message: '消息',
  wait: '待办'
}

const renderInfo = function (this: any, key: string, info: any) {
  const { messagePropsCopy } = this
  const getImage = (icon: string) => {
    if (['./', '..', '@', 'http', '/', '//'].some((str: string) => icon?.startsWith(str))) {
      return <el-avatar src={icon} alt={icon} />
    } else {
      return icon?.startsWith('van-') ? (
        <van-icon name={icon?.slice('van-'.length)} />
      ) : (
        <i class={icon} />
      )
    }
  }

  return (
    <li
      key={`${key}${info[messagePropsCopy['id']] || ''}`}
      class={{
        column: key === 'wait'
      }}
    >
      {
        {
          notify: (
            <>
              <div class="info-img">{getImage(info[messagePropsCopy['icon']])}</div>
              <div class="info-text">
                <p>{info[messagePropsCopy['content']]}</p>
                <p>{info[messagePropsCopy['date']]}</p>
              </div>
            </>
          ),
          message: (
            <>
              <div class="info-img">{getImage(info[messagePropsCopy['icon']])} </div>
              <div class="info-text">
                {isNotEmptyString(info[messagePropsCopy['name']]) && (
                  <p>{info[messagePropsCopy['name']]} 回复了 你</p>
                )}
                <p>{info[messagePropsCopy['content']]}</p>
                <p>{info[messagePropsCopy['date']]}</p>
              </div>
            </>
          ),
          wait: (
            <>
              <p>{info[messagePropsCopy['content']]}</p>
              <p>
                <el-tag type={info[messagePropsCopy['status']]} size="small">
                  {info[messagePropsCopy['statusText']]}
                </el-tag>
              </p>
              {isNotEmptyString(info[messagePropsCopy['tip']]) && (
                <p>{info[messagePropsCopy['tip']]}</p>
              )}
            </>
          )
        }[key]
      }
    </li>
  )
}

const MessageList = defineComponent({
  name: 'MessageList',
  componentName: 'ManageMessageList',
  props: {
    message: {
      type: Object as PropType<Message>,
      default: () => ({
        notify: [],
        message: [],
        wait: []
      })
    },
    messageProps: {
      type: Object as PropType<MessageProps>,
      default: () => ({})
    }
  },
  setup(props) {
    const messageTag = ref<string>('notify')
    const messagePropsCopy = computed(() =>
      Object.assign(
        {
          id: 'id',
          icon: 'icon',
          name: 'name',
          content: 'content',
          date: 'date',
          status: 'status',
          statusText: 'statusText',
          tip: 'tip'
        },
        props.messageProps
      )
    )
    return {
      messageTag,
      messagePropsCopy
    }
  },
  render() {
    const slots: any = this.$slots
    return (
      <el-popover placement="bottom" width={300}>
        {{
          default: () => (
            <el-tabs stretch v-model={this.messageTag}>
              {Object.entries(this.message).map(([key, option]: any) => (
                <el-tab-pane name={key} key={key} label={messageMap[key]}>
                  {Array.isArray(option) && option.length > 0 ? (
                    <ul class="manage-message-list">
                      {option.map((info: any) => renderInfo.call(this, key, info))}
                    </ul>
                  ) : isFunction(slots[key]) ? (
                    slots[key](option)
                  ) : (
                    <el-empty description="暂无数据" />
                  )}
                </el-tab-pane>
              ))}
            </el-tabs>
          ),
          reference: () => (
            <el-badge is-dot type="danger">
              <i
                class={{
                  'header-message': true,
                  'el-icon-bell': true
                }}
              />
            </el-badge>
          )
        }}
      </el-popover>
    )
  }
})

export default MessageList
