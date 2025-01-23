import { useState,useEffect } from "react";
import { WS_URL } from "../confing";

export function useSocket(){
    const [loading,setLoading] = useState(true)
    const [socket,setSocket] = useState<WebSocket>()

    useEffect(() => {
      const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzOTJmZmEyOS0wYjAwLTQwNWUtOTVmYy05ZjEwNzAxM2U0YWYiLCJpYXQiOjE3Mzc1NDk0NDV9.q2_krAz371cXpAHyflStVHSAtUdw8k_IQw29bIu90gc`)
      ws.onopen= ()=>{
        setLoading(false)
        setSocket(ws)
      }
    }, [])

    return { socket,loading}
    
}