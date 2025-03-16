"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
  messages,
  id
}: {
  messages: { message: string }[];
  id: string;
}) {
  const [chats, setChats] = useState(messages);
  const [currentMessage, setCurrentMessage] = useState("");
  const { socket, loading } = useSocket();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const roomName = pathname.split("/").pop();

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [chats]);
  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        })
      );
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        setChats((c) => [...c, { message: parsedData.message }]);
      };
    }
    // return () => {
    //   socket?.close();
    // };
  }, [socket, loading]);

  const sendMessage = () => {
    if (currentMessage.trim() === '') return;
    
    socket?.send(
      JSON.stringify({
        type: "chat",
        roomId: id,
        message: currentMessage,
      })
    );
    setCurrentMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      <style jsx>{`
        .chatContainer {
          display: flex;
          flex-direction: column;
          height: 95vh;
          max-width: 800px;
          margin: 20 auto;
          background-color: #1a1a1a;
          color: #f5f5f5;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .chatHeader {
          padding: 20px;
          background-color: #252525;
          border-bottom: 1px solid #333;
          text-align: center;
        }

        .chatHeader h2 {
          margin: 0;
          font-weight: 500;
          color: #e2e2e2;
        }

        .messagesContainer {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .messagesContainer::-webkit-scrollbar {
          width: 6px;
        }

        .messagesContainer::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        .messagesContainer::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 3px;
        }

        .messageWrapper {
          display: flex;
          margin: 4px 0;
        }

        .messageContent {
          padding: 10px 15px;
          background-color: #333;
          border-radius: 18px;
          max-width: 70%;
          position: relative;
        }

        .messageContent p {
          margin: 0;
          font-size: 15px;
          word-break: break-word;
        }

        .inputContainer {
          display: flex;
          padding: 15px;
          background-color: #252525;
          border-top: 1px solid #333;
          gap: 10px;
        }

        .messageInput {
          flex: 1;
          padding: 12px 15px;
          border: none;
          border-radius: 20px;
          background-color: #3a3a3a;
          color: #fff;
          font-size: 15px;
          outline: none;
        }

        .messageInput::placeholder {
          color: #999;
        }

        .sendButton {
          border: none;
          background-color: #5250C5;
          color: white;
          padding: 0 20px;
          border-radius: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .sendButton:hover {
          background-color: #6462E2;
        }

        .sendButton:active {
          background-color: #4240A8;
        }
      `}</style>
      
      <div className="chatContainer">
        <div className="chatHeader">
          <h2>Chat Room: {roomName}</h2>
        </div>
        
        <div className="messagesContainer"> 
          {chats.map((m, index) => (
            <div key={index} className="messageWrapper">
              <div className="messageContent">
                <p>{m.message}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="inputContainer">
          <input
            type="text"
            placeholder="Type a message..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="messageInput"
          />
          <button 
            onClick={sendMessage}
            className="sendButton"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
