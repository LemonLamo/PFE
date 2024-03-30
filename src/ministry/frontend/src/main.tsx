import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import router from './router';
import { RouterProvider } from 'react-router-dom'
axios.defaults.headers.common.Authorization = "Bearer " + (sessionStorage.getItem('jwt') ?? localStorage.getItem('jwt'))

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
