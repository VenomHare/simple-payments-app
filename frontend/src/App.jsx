import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function App() {
  const navigate = useNavigate();
  useEffect(()=>{
    navigate("/signin");
  },[])
  return (
    <div>
        Hello world
    </div>
  )
}

export default App
