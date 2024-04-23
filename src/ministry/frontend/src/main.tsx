import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import router from './router';
import { RouterProvider } from 'react-router-dom'
import { getJWTContent } from './hooks/useAuth'
import AuthContext from './hooks/AuthContext'
import { AlertsProvider } from './hooks/AlertsContext'
axios.defaults.headers.common.Authorization = "Bearer " + (sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt'))

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContext.Provider value={getJWTContent()}>
      <AlertsProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AlertsProvider>
    </AuthContext.Provider>
  </React.StrictMode>,
)
