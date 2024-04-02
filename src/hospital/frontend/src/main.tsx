import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import router from './router';
import { RouterProvider } from 'react-router-dom'
import { getJWTContent } from './hooks/useAuth'
import AuthContext from './hooks/AuthContext'
axios.defaults.headers.common.Authorization = "Bearer " + (sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt'))

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContext.Provider value={getJWTContent()}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContext.Provider>
  </React.StrictMode>,
)
