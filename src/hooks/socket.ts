import { inject, ref, watch, computed } from 'vue'
import { isNotEmptyString } from '@/utils/types'
import { parseTime } from '@/utils/tool'
import { useStore } from 'vuex'
import { showChats, showUsers } from '@/api/backen/chat'
import { Toast } from 'vant'
import Message from 'element-plus/lib/el-message'

interface History {
  avatar: string,
  content: string,
  createDate: string,
  style: any,
  uid: number,
  cid: number,
  username: string,
  [propName: string]: any
}

export const useWebSocket = (props: any, emit: any) => {
  const socket = ref<any>(null)
  const store = useStore()
  const messageSend = ref<string>('')
  const messageLoading = ref<boolean>(false)
  const messageList = ref<any>({})
  const cids = ref<any>({})
  const userList = ref<any[]>([])
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
        initSocketMethods()
      } else {
        showError('浏览器暂不支持websocket')
      }
    }
  }

  const socketMessage = ({ data = '{}' }: any) => {
    if (data === '{}') {
      return
    } else {
      reshapeHistory(JSON.parse(data))
    }
  }

  const initSocketMethods = () => {
    if (socket.value) {
      socket.value.onopen = () => {
        socketStatus.value.status = 'success'
        socketStatus.value.statusText = 'CONNECTED'
        getChatsHistory()
        getAllUsers()
        showSuccess('连接成功')
      }
      socket.value.onclose = () => {
        socketStatus.value.status = 'warning'
        socketStatus.value.statusText = 'CLOSED'
        showSuccess('断开连接')
        if (Object.keys(messageList.value).length) {
          current = 0
          total.value = 0
          messageList.value = {}
        }
        if (userList.value.length) {
          userList.value = []
        }
        socket.value = null
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
          data.rows.forEach(reshapeHistory)
        }
      })
      .finally(() => {
        messageLoading.value = false
      })
  }

  const getAllUsers = () => {
    showUsers().then((data: any) => {
      userList.value = data
    })
  }

  const reshapeHistory = (row: History) => {
    if (cids.value[row.cid]) {
      return
    }
    cids.value[row.cid] = true
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
  }

  watch(
    socket,
    () => {
      emit('get-socket', socket.value)
    },
    { immediate: true }
  )

  return {
    initSocket,
    sendMessage,
    socket,
    socketStatus,
    messageSend,
    messageLoading,
    messageList,
    currentUser,
    getChatsHistory,
    getAllUsers
  }
}
