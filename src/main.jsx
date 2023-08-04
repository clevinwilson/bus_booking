import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import RootContext from './store/RootContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RootContext>
      <App />
   </RootContext>
  </React.StrictMode>,
)
