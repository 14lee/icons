/* eslint-disable import/no-default-export */
import * as icons from './components'
import type { App } from 'vue'

export interface InstallOptions {
  /** @default `SuIcon` */
  prefix?: string
}
export default (app: App, { prefix = 'SuIcon' }: InstallOptions = {}) => {
  for (const [key, component] of Object.entries(icons)) {
    app.component(prefix + key, component)
  }
}

export { icons }
export * from './components'
