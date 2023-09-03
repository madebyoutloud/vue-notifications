/// <reference types="vite/client" />

declare const DEV: boolean
declare const VERSION: string
declare const NAME: string

declare module '*.vue' {
  import { type DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}
