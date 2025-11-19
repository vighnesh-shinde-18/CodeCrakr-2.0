import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import ThemeContextProvider from './context/ThemeContext.jsx';
import './index.css'
import App from './App.jsx'
import { SidebarProvider } from '@/components/ui/sidebar';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeContextProvider>
      <SidebarProvider>
      <App />
      </SidebarProvider>
    </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
