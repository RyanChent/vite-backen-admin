import { onBeforeUnmount, inject, ref, watch } from 'vue'
import { Toast } from 'vant'
import Message from 'element-plus/lib/el-message'
export const useWebSocket = (props: any, emit: any) => {
  const socket = ref<any>(null)
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
      if ('WebSocket' in window) {
        socket.value = new WebSocket((window as any)._config.ws)
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
        socketStatus.value.statusText = 'SUCCESS'
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
    socket,
    socketStatus
  }
}
