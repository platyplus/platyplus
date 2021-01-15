/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types */
// * See: https://github.com/primefaces/primevue/issues/767
import { PluginFunction } from 'vue'

declare module 'primevue/confirmationservice' {
  export const install: PluginFunction<{}>
}
