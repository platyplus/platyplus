import * as ReactDOM from 'react-dom'

import { App } from '@platyplus/app'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered')
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}

ReactDOM.render(<App title="Platyplus" />, document.getElementById('root'))
