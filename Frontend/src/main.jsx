import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux"
import App from './App/App.jsx'
import { store } from './App/store.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
  </Provider>
)
