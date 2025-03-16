"use client";

import React, { useState } from "react";
import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Not authenticated. Please sign in first.");
        setIsLoading(false);
        return;
      }

      const response = await axios.post("http://localhost:3003/room", 
        { name: roomName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          }
        }
      );

      // Adjust the response handling 
      const data = response.data;
      if (response.status === 200 || response.status === 201) {
        // Navigate rooms page
        router.push(`/rooms`);
      } else {
        setError(data.message || "Failed to create room");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-room-container">
      <Card
        title="Create a New Chat Room"
        description="Enter a unique name for your room. This will be used as the room code that others can use to join."
        iconColor="purple"
        icon={
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            viewBox="0 0 24 24"   
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <line x1="12" y1="7" x2="12" y2="13" />
            <line x1="9" y1="10" x2="15" y2="10" />
          </svg>
        }
        footer={
          error ? (
            <div className="error-message">{error}</div>
          ) : null
        }
        className="create-room-card"
      >
        <form onSubmit={handleSubmit} className="room-form">
          <div className="form-group">
            <label htmlFor="roomName">Room Code:</label>
            <input
              type="text"
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter a unique room code"
              required
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            variant="primary"
            disabled={isLoading || !roomName.trim()}
            fullWidth={true}
            style={{ 
              backgroundColor: '#8b5cf6',
              marginTop: '1.5rem'
            }}
          >
            {isLoading ? "Creating..." : "Create Room"}
          </Button>
        </form>
      </Card>

      <style jsx>{`
        .create-room-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 2rem;
          background: linear-gradient(135deg, #13151a 0%, #2d3748 100%);
        }
        
        .create-room-card {
          width: 100%;
          max-width: 500px;
        }
        
        .room-icon {
          font-size: 2rem;
        }
        
        .room-form {
          width: 100%;
          margin-top: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
          width: 100%;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #e2e8f0;
        }
        
        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #4b5563;
          background-color: #2d3748;
          color: #e2e8f0;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .form-group input:focus {
          border-color: #a78bfa;
          outline: none;
          box-shadow: 0 0 0 2px rgba(167, 139, 250, 0.2);
        }
        
        .form-group input::placeholder {
          color: #6b7280;
        }
        
        .submit-button {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.5rem;
          background-color: #8b5cf6;
          color: #ffffff;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .submit-button:hover {
          background-color: #7c3aed;
          transform: translateY(-2px);
        }
        
        .submit-button:disabled {
          background-color: #6b7280;
          cursor: not-allowed;
          transform: none;
        }
        
        .error-message {
          padding: 0.75rem;
          margin-top: 1rem;
          border-radius: 0.5rem;
          background-color: rgba(239, 68, 68, 0.1);
          color: #f87171;
          text-align: center;
          font-size: 0.875rem;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
      `}</style>
    </div>
  );
}
