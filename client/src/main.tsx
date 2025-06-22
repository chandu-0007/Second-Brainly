import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './components/useAuth.tsx'
createRoot(document.getElementById('root')!).render(

 <BrowserRouter>
   <AuthProvider>
       <App/>
   </AuthProvider>
 </BrowserRouter>
 
)
