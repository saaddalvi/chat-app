"use client"
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";



export default function Home() {
  const [roomId,setRoomId] = useState("")
  const router = useRouter()
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <input 
      onChange={(e) => setRoomId(e.target.value)} 
      value={roomId} 
      type="text" 
      placeholder="Room ID" 
      style={{
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: 'white',
        color: 'black',
        border: '1px solid #ccc',
        borderRadius: '10px',
      }}
      />
      <button 
      onClick={() => router.push(`/room/${roomId}`)} 
      style={{
        padding: '10px 20px',
        backgroundColor: 'white',
        color: 'black',
        fontWeight: 'bold',
        border: '1px solid #ccc',
        borderRadius: '50px',
        cursor: 'pointer',
      }}
      >
      Join Room
      </button>
    </div>
  );
}
