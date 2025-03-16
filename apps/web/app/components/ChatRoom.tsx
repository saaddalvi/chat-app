import axios from "axios";
import { BACKEND_URL } from "../confing";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: string) {
  try {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    return response.data.messages || [];
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
}

export default async function ChatRoom({ id }: { id: string }) {
    let messages = [];
    try {
        messages = await getChats(id);
    } catch (error) {
        console.error("Failed to load messages:", error);
    }
    
    return (
        <div className="chat-room-container">
            <ChatRoomClient id={id} messages={messages}/>
        </div>
    );
}
