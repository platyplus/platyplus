import * as ReactDOM from 'react-dom'

import { info } from '@platyplus/logger'
import { App } from '@platyplus/app'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        info('SW', 'registered')
      })
      .catch((registrationError) => {
        info('SW', 'registration failed: ', registrationError)
      })
  })
}

ReactDOM.render(<App />, document.getElementById('root'))
