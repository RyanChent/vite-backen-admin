import { defineComponent } from 'vue'
import layout from './layout'

const App = defineComponent({
  name: 'App',
  components: {
    layout
  },
  setup() {
    return () => <layout />
  }
})

export default App
