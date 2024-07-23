import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store.jsx'
import { Provider } from 'react-redux'


const AuthContext = createContext()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext.Provider value={{}}>
    <BrowserRouter>
    <Provider store={store}>
     <App/>
     </Provider>
    </BrowserRouter>
    </AuthContext.Provider>
  </React.StrictMode>,
)
