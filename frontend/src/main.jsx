import './index.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import queryClient from './config/queryClient.js'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
