"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";

const JoinRoomPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();

  const handleJoinRoom = () => {
    if (roomCode.trim()) {
      router.push(`/room/${roomCode}`);
    }
  };

  return (
    <div className="join-room-container">
      <Card
        title="Join a Room"
        description="Enter the room code to join and interact with other users."
        className="join-room-card"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v18m9-9H3"
            />
          </svg>
        }
        iconColor="blue"
      >
        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <Button onClick={handleJoinRoom} variant="primary">
          Join Room
        </Button>
      </Card>

      <style jsx>{`
        .join-room-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          color: #ffffff;
          padding: 1rem;
        }

        .join-room-card {
          width: 100%;
          max-width: 500px;
          background-color: #2d3748;
          border: 1px solid #4a5568;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .icon {
          width: 40px;
          height: 40px;
        }

        input {
          padding: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #4a5568;
          background-color: #4a5568;
          color: #ffffff;
          margin-bottom: 1rem;
          width: 100%;
          font-size: 1rem;
        }

        input::placeholder {
          color: #a0aec0;
        }

        button {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.5rem;
          background-color: #3182ce;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #2b6cb0;
        }
      `}</style>
    </div>
  );
};

export default JoinRoomPage;
