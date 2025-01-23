"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
export function ChatRoomClient({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) {
  const [chats, setChats] = useState(messages);
  const [currentMessage, setCurrentMessage] = useState("");
  const { socket, loading } = useSocket();
  console.log(`these are the chats ${chats}`);

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
        console.log(chats);
      };
    }
    // return () => {
    //   socket?.close();
    // };
  }, [socket, loading]);

  return (
    <>
      <div>
        {chats.map((m) => (
          <div>{m.message}</div>
        ))}
      </div>

      <div>
        <input
          type="text"
          placeholder="Type Message"
          value={currentMessage}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <button
          onClick={() => {
            socket?.send(
              JSON.stringify({
                type: "chat",
                roomId: id,
                message: currentMessage,
              })
            );
            setCurrentMessage("");
          }}
        >
          Send Message
        </button>
      </div>
    </>
  );
}
