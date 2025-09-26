import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
if("serviceWorker" in navigator){
  navigator.serviceWorker.register("/firebase-messaging-sw.js").then((registeration)=>{
    console.log("Registeration",registeration)
  })
  .catch((err)=>{
    console.log("Can't Register: ",err)
  })
}
