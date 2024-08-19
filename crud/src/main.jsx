import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store.jsx'
import { Provider } from 'react-redux'
import { Suspense } from 'react'

const AuthContext = createContext()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Suspense fallback="Loading">
    <BrowserRouter>
    <Provider store={store}>
     <App/>
     </Provider>
    </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
)
