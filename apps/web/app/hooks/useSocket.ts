import { useState,useEffect } from "react";
import { WS_URL } from "../confing";

export function useSocket(){
    const [loading,setLoading] = useState(true)
    const [socket,setSocket] = useState<WebSocket>()

    useEffect(() => {
      const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNDRkN2RkMy1iN2Y0LTRlMTgtODYxYy0yZjdkMWU5YTA4MjYiLCJpYXQiOjE3NDIxMTYzNjF9.H0D5bZb-2Fp_sdfpQ5F8kuLJGhmY2G2kzBDeUKiuv6E`)
      ws.onopen= ()=>{
        setLoading(false)
        setSocket(ws)
      }
    }, [])

    return { socket,loading}
    
}