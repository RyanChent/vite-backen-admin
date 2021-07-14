import { onBeforeUnmount, inject, ref, watch, computed } from 'vue'
import { isNotEmptyString } from '@/utils/types'
import { parseTime } from '@/utils/tool'
import { useStore } from 'vuex'
import { showChats } from '@/api/backen/chat'
import { Toast } from 'vant'
import Message from 'element-plus/lib/el-message'
export const useWebSocket = (props: any, emit: any) => {
  const socket = ref<any>(null)
  const store = useStore()
  const messageSend = ref<string>('')
  const messageLoading = ref<boolean>(false)
  const messageList = ref<any>({})
  const total = ref<number>(0)
  const currentUser = computed(() => store.state.user.userInfo)
  let current = 0
  const socketStatus = ref<any>({
    status: 'warning',
    statusText: 'CLOSED'
  })

  const isMobile = inject<any>('isMobile')
  const showError = isMobile.value ? Toast.fail : Message.error
  const showSuccess = (isMobile.value ? Toast : Message).success

  const initSocket = () => {
    if (!socket.value) {
      socketStatus.status = ''
      socketStatus.statusText = 'CONNECTING'
      current = 0
      if ('WebSocket' in window) {
        socket.value = new WebSocket((window as any)._config.ws)
        getChatsHistory()
        initSocketMethods()
      } else {
        showError('浏览器暂不支持websocket')
      }
    }
  }

  const socketMessage = (message: any) => {
    console.log(message)
  }

  const initSocketMethods = () => {
    if (socket.value) {
      socket.value.onopen = () => {
        socketStatus.value.status = 'success'
        socketStatus.value.statusText = 'CONNECTED'
        showSuccess('连接成功')
      }
      socket.value.onclose = () => {
        socketStatus.value.status = 'warning'
        socketStatus.value.statusText = 'CLOSED'
        showSuccess('断开连接')
      }
      socket.value.onerror = () => {
        socketStatus.value.status = 'danger'
        socketStatus.value.statusText = 'ERROR'
        initSocket()
      }
      socket.value.onmessage = socketMessage
    }
  }

  const sendMessage = () => {
    if (isNotEmptyString(messageSend.value) && socket.value) {
      const messageObj = Object.assign({}, currentUser.value, {
        content: escape(messageSend.value.trim()),
        style: {}
      })
      socket.value.send(JSON.stringify(messageObj))
      messageSend.value = ''
    }
  }

  const getChatsHistory = () => {
    messageLoading.value = true
    current += 1
    showChats({ current })
      .then((data: any) => {
        if (total.value < data.count) {
          total.value = data.count
          data.rows.forEach((row: any) => {
            const content = unescape(row.content)
            const [ymd, hms] = parseTime(row.createDate, '{y}-{m}-{d} {h}:{m}:{s}').split(' ')
            const obj = {
              ...row,
              content,
              createDate: hms
            }
            if (!messageList.value[ymd]) {
              messageList.value[ymd] = [obj]
            } else {
              messageList.value[ymd].push(obj)
            }
          })
        }
      })
      .finally(() => {
        messageLoading.value = false
      })
  }

  watch(
    socket,
    () => {
      emit('get-socket', socket.value)
    },
    { immediate: true }
  )

  onBeforeUnmount(() => {
    if (socket.value) {
      socket.value = null
    }
  })

  return {
    initSocket,
    sendMessage,
    socket,
    socketStatus,
    messageSend,
    messageLoading,
    messageList,
    currentUser,
    getChatsHistory
  }
}