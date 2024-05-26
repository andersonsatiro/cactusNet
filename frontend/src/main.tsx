import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './globals.css'
import { GlobalContextProvider } from './context/GlobalContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GlobalContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GlobalContextProvider>
)
