declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module '*.tsx' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module 'animate.css'
declare module 'nprogress'
declare module 'sortablejs'
declare module 'qrcode'
declare module '*.ts'
declare module '*.json'
declare module '*.js'
declare module '*.css'
declare module '*.md'
declare module '@/*'
declare module '@*'
