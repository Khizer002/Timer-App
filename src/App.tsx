import { useEffect } from "react"
import Timer from "./components/Timer"
import {initNotification} from "./services/notification.ts"

function App() {
  useEffect(()=>{
    initNotification();
  },[])
  return (
    <>
      <Timer />
    </>
  )
}

export default App
