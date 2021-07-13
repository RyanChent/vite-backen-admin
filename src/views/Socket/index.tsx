import { defineComponent, resolveComponent } from 'vue'

const SocketPage = defineComponent({
  name: 'SocketPage',
  componentName: 'ManageSocketPage',
  render() {
    const Socket: any = resolveComponent('Socket')
    return <Socket />
  }
})

export default SocketPage
