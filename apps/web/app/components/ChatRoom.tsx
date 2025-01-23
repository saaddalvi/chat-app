import axios from "axios";
import { BACKEND_URL } from "../confing";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: string) {
  const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
  console.log(response.data)
  return response.data.messages;
  
}

export default async function ChatRoom({ id }: { id: string }) {

    const messages = await getChats(id)
    console.log(`these are the messages ${messages}`)
    return <>
    <ChatRoomClient id={id} messages={messages}/>
    </>
} 
