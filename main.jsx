import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './src/App/App'
import { store } from './src/Redux/store'
import GlobalStyles from './src/common/Global-styles/global-styles'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GlobalStyles/>
    <App />
  </Provider>
)
